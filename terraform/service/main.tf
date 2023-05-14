
terraform {
  backend "s3" {
    bucket         = "tf-state-annlee"
    key            = "terraform/service/terraform.tfstate"
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


# get output from cluster stack
data "terraform_remote_state" "cluster" {
  backend = "s3"
  config = {
    bucket = "tf-state-annlee"
    key    = "terraform/cluster/terraform.tfstate"
    region = "us-east-1"
  }
}
# get output from network stack
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "tf-state-annlee"
    key    = "terraform/networking/terraform.tfstate"
    region = "us-east-1"
  }
}
