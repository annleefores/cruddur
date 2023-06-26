

# tflint-ignore: terraform_unused_declarations
data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "${path.module}/../../frontend-nextjs/"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "ProcessDynamoDBStreamTF" {
  # If the file is not in the current working directory you will need to include a
  # path.module in the filename.
  filename      = "lambda_function_payload.zip"
  function_name = var.lambda_function_name
  role          = aws_iam_role.process_lambda_role.arn
  handler       = "lambda_handler"
  memory_size   = var.memory_size
  package_type  = "Zip"
  runtime       = var.PythonRuntime
  timeout       = var.timeout
  environment {
    variables = {
      REGION = var.REGION
    }
  }
}

