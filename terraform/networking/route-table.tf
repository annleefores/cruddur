resource "aws_route_table" "crd-rt" {
  vpc_id = aws_vpc.cruddur_vpc.id

  tags = {
    Name = "cruddur-route-table"
  }
}

resource "aws_route" "r-igw" {
  route_table_id         = aws_route_table.crd-rt.id
  gateway_id             = aws_internet_gateway.igw.id
  destination_cidr_block = "0.0.0.0/0"
}


resource "aws_route_table_association" "rt-association" {
  for_each       = { for idx, subnet in aws_subnet.public_subnet : idx => subnet.id }
  subnet_id      = each.value
  route_table_id = aws_route_table.crd-rt.id

}
