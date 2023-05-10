variable "healthy_threshold" {
  type    = number
  default = 2
}

variable "unhealthy_threshold" {
  type    = number
  default = 2
}
variable "interval" {
  type    = number
  default = 15
}
variable "path" {
  type    = string
  default = "/api/health-check"
}
variable "port" {
  type    = string
  default = "80"
}
variable "timeout" {
  type    = number
  default = 5
}
variable "BackendPort" {
  type    = number
  default = 4567
}
