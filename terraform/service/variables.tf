variable "containername" {
  type    = string
  default = "backend-flask"
}

variable "containerport" {
  type    = number
  default = 4567
}

variable "backend_image" {
  type    = string
  default = "453188237434.dkr.ecr.us-east-1.amazonaws.com/backend-flask"
}

variable "region" {
  type    = string
  default = "us-east-1"

}

variable "OTEL_SERVICE_NAME" {
  type    = string
  default = "backend-flask"

}
variable "OTEL_EXPORTER_OTLP_ENDPOINT" {
  type    = string
  default = "https://api.honeycomb.io"

}
variable "FRONTEND_URL" {
  type    = string
  default = "*"

}
variable "BACKEND_URL" {
  type    = string
  default = "*"

}
variable "service_cpu" {
  type    = string
  default = "256"

}
variable "service_memory" {
  type    = string
  default = "512"

}

variable "AWS_ACCOUNT_ID" {
  type = string
}
