
resource "aws_apigatewayv2_domain_name" "api_gw_domain" {
  domain_name = var.domainName

  domain_name_configuration {
    certificate_arn = var.CertificateARN
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

data "aws_route53_zone" "HostedZoneID" {
  name         = var.HostedZoneDomain
  private_zone = false
}

resource "aws_route53_record" "example" {
  name    = aws_apigatewayv2_domain_name.api_gw_domain.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.HostedZoneID.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.api_gw_domain.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_gw_domain.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_api_mapping" "api_gw_domain_mapping" {
  api_id      = aws_apigatewayv2_api.httpAPI.id
  domain_name = aws_apigatewayv2_domain_name.api_gw_domain.id
  stage       = "$default"
}

