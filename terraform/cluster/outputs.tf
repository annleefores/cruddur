
output "backendTG" {
  value = aws_lb_target_group.backendTG
}

output "frontendTG" {
  value = aws_lb_target_group.frontendTG
}

output "ALBSG" {
  value = aws_security_group.ALBSG.id

}
output "ServiceSG" {
  value = aws_security_group.ServiceSG.id

}
