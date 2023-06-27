
variable "memory_size" {
  type    = number
  default = 512

}

variable "NodeRuntime" {
  type    = string
  default = "nodejs18.x"

}

variable "timeout" {
  type    = number
  default = 10

}

variable "lambda_function_name" {

  type    = string
  default = "frontend-nextjs"

}

variable "AWS_LAMBDA_EXEC_WRAPPER" {
  type    = string
  default = "/opt/bootstrap"

}

variable "PORT" {
  type    = number
  default = 8000

}

variable "REGION" {
  type      = string
  sensitive = true

}

variable "domainName" {
  type = string

}

variable "CertificateARN" {
  type = string

}

variable "HostedZoneDomain" {
  type = string

}
