terraform {
  backend "s3" {
    bucket         = "tf-state-annlee"
    key            = "terraform/db/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-state-lock"
    encrypt        = true

  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  required_version = "~> 1.4.6"
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}


resource "aws_db_instance" "crd_rds_tf" {
  allocated_storage           = 20
  db_name                     = var.crd_db_tf
  allow_major_version_upgrade = true
  auto_minor_version_upgrade  = true
  backup_retention_period     = var.backup_retention_period
  engine                      = "postgres"
  engine_version              = var.engine_version
  instance_class              = var.instance_class
  identifier_prefix           = "cruddur-db-tf"
  username                    = var.username
  password                    = var.password
  deletion_protection         = var.deletion_protection
  performance_insights_enabled = true
  publicly_accessible         = true
  db_subnet_group_name        = 
  vpc_security_group_ids      = 

}

#DB subnet group

#DB SG