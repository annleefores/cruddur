resource "aws_apigatewayv2_api" "httpAPI" {
  name          = var.domainName
  protocol_type = "HTTP"
  target        = aws_lambda_function.frontend-nextjs.arn
}

resource "aws_lambda_permission" "apigw" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.frontend-nextjs.arn
  principal     = "apigateway.amazonaws.com"

  # The /* part allows invocation from any stage, method and resource path
  # within API Gateway.

  source_arn = "${aws_apigatewayv2_api.httpAPI.execution_arn}/*/*"
}
