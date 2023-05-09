
resource "aws_vpc" "cruddur_vpc" {
  cidr_block           = var.vpc_cidr_block
  instance_tenancy     = "default"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    name = "cruddur_vpc"
  }

}

resource "aws_subnet" "public_subnet_1" {
  for_each                = toset(var.subnet_cidr_blocks)
  vpc_id                  = aws_vpc.cruddur_vpc.id
  cidr_block              = each.value
  availability_zone       = var.availability_zones[index(var.subnet_cidr_blocks, each.value)]
  enable_dns64            = false
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.stack_name}SubnetPub${index(var.subnet_cidr_blocks, each.value) + 1}"
  }
}
