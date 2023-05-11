resource "aws_ecs_cluster" "CrdFargateCluster" {
  name = "CrdFargateCluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  configuration {
    execute_command_configuration {
      logging = "DEFAULT"
    }
  }
  service_connect_defaults {
    namespace = aws_service_discovery_http_namespace.namespace.arn
  }

}

resource "aws_ecs_cluster_capacity_providers" "ClusterCapProv" {
  cluster_name       = aws_ecs_cluster.CrdFargateCluster.name
  capacity_providers = ["FARGATE"]
}

resource "aws_service_discovery_http_namespace" "namespace" {
  name        = "cruddurtf"
  description = "cruddur tf namespace"
}

# service SG
resource "aws_security_group" "ServiceSG" {
  name   = "ServiceSG_TF"
  vpc_id = data.terraform_remote_state.network.outputs.vpc_id
}

resource "aws_vpc_security_group_ingress_rule" "ServiceSG_ingress" {
  security_group_id = aws_security_group.ServiceSG.id

  description                  = "ALB HTTP"
  from_port                    = var.BackendPort
  referenced_security_group_id = aws_security_group.ALBSG.id
  ip_protocol                  = "tcp"
  to_port                      = var.BackendPort
}
