data "aws_vpc" "" {

}

resource "aws_lb_target_group" "backendTG" {
  name             = "backendTG-tf"
  port             = var.BackendPort
  protocol         = "HTTP"
  protocol_version = "HTTP2"
  target_type      = "ip"
  ip_address_type  = "ipv4"
  vpc_id           = aws_vpc.main.id

  health_check {
    enabled             = true
    healthy_threshold   = var.healthy_threshold
    unhealthy_threshold = var.unhealthy_threshold
    interval            = var.interval
    matcher             = 200
    path                = var.path
    port                = var.port
    protocol            = "HTTP"
    timeout             = var.timeout
  }
}
