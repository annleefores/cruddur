
terraform {

  backend "s3" {
    bucket         = "tf-state-annlee"
    key            = "terraform/frontend-nextjs/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tf-state-lock"
    encrypt        = true

  }

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
