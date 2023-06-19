variable "vpc_cidr_block" {
  type    = string
  default = "10.0.0.0/16"
}

variable "subnet_cidr_blocks" {
  type    = list(string)
  default = ["10.0.0.0/24", "10.0.4.0/24", "10.0.8.0/24"]
}

variable "availability_zones" {
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "stack_name" {
  type    = string
  default = "CrdSrvBE-TF"

}
