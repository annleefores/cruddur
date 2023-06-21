resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.cruddur_vpc.id

  tags = {
    Name = "cruddur-igw"
  }
}
