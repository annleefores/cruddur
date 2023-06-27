
# tflint-ignore: terraform_unused_declarations
data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../../frontend-nextjs/function/"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "frontend-nextjs" {
  # Create with dummy zip file and upload files later
  filename      = "lambda_function_payload.zip"
  function_name = var.lambda_function_name
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "run.sh"
  memory_size   = var.memory_size
  package_type  = "Zip"
  runtime       = var.NodeRuntime
  timeout       = var.timeout
  architectures = ["x86_64"]
  layers        = ["arn:aws:lambda:${var.REGION}:753240598075:layer:LambdaAdapterLayerX86:16"]
  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER = var.AWS_LAMBDA_EXEC_WRAPPER
      AWS_LWA_ENABLE_COMPRESSION : true
      RUST_LOG : "info"
      PORT : var.PORT
    }
  }

}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


resource "aws_cloudwatch_log_group" "frontend_nextjs_log" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = 7
}

# See also the following AWS managed policy: AWSLambdaBasicExecutionRole
data "aws_iam_policy_document" "lambda_logging" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "lambda_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.lambda_logging.json
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

