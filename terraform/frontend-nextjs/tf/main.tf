
terraform {

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "2.4.0"
    }
    null = {
      source  = "hashicorp/null"
      version = "3.2.1"
    }
  }

  required_version = "~> 1.6.1"
}

# Configure the AWS Provider
provider "aws" {
  region = var.REGION
}
