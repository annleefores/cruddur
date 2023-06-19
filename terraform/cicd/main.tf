terraform {
  backend "s3" {
    bucket         = "tf-state-annlee"
    key            = "terraform/cicd/terraform.tfstate"
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

resource "aws_codestarconnections_connection" "gh_codestar" {
  name          = "crd-codestar-tf"
  provider_type = "GitHub"
}
