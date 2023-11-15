
locals {
  STANDALONE_SRC = "${var.SOURCE_DIR}/standalone"
}
# tflint-ignore: terraform_unused_declarations
data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = local.STANDALONE_SRC
  output_path = "${local.STANDALONE_SRC}/lambda_function_payload.zip"
}

# update lambda files on Next.js application file changes
resource "null_resource" "lambda_data_trigger" {
  depends_on = [aws_lambda_function.nextjs]
  triggers = {
    src_hash = data.archive_file.lambda.output_base64sha256
  }

  provisioner "local-exec" {
    command = "aws lambda update-function-code --function-name ${var.LAMBDA_FUNCTION_NAME} --region ${var.REGION} --zip-file fileb://${data.archive_file.lambda.output_path} >/dev/null"
  }
}

# tflint-ignore: terraform_unused_declarations
data "archive_file" "lambda_dummy_file" {
  # Create a dummy lambda payload for initial lambda creation
  type        = "zip"
  source_file = "${local.STANDALONE_SRC}/run.sh"
  output_path = "${local.STANDALONE_SRC}/dummy_payload.zip"
}

resource "aws_lambda_function" "nextjs" {
  # Creates a lambda functon with dummy payload which gets updated later with data.archive_file.lambda
  filename      = data.archive_file.lambda_dummy_file.output_path
  function_name = var.LAMBDA_FUNCTION_NAME
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "run.sh"
  memory_size   = var.memory_size
  package_type  = "Zip"
  runtime       = var.NodeRuntime
  timeout       = var.timeout
  architectures = ["x86_64"]
  layers        = ["arn:aws:lambda:${var.REGION}:753240598075:layer:LambdaAdapterLayerX86:17"]
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
  name               = "iam_for_lambda_nextjs"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


resource "aws_cloudwatch_log_group" "nextjs_log" {
  name              = "/aws/lambda/${var.LAMBDA_FUNCTION_NAME}"
  retention_in_days = 7
}

# See also the following AWS managed policy: AWSLambdaBasicExecutionRole
data "aws_iam_policy_document" "lambda_nextjs_logging" {
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
  name        = "lambda_nextjs_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.lambda_nextjs_logging.json
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}

