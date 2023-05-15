
resource "aws_codebuild_project" "crd_codebuild" {
  name = "crd_codebuild_tf"
  build_timeout = var.codebuild_build_timeout 
  queued_timeout = var.codebuild_queue_timeout
  service_role =

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = var.codebuild_compute
    image = var.codebuild_image
    type = "LINUX_CONTAINER"
    privileged_mode = true
  }


  source {
    type = "CODEPIPELINE"
    buildspec = var.buildspec
  }

  logs_config {
    cloudwatch_logs {
      group_name = var.group_name
      status = "ENABLED"
      stream_name = var.stream_name
    }
  }

  tags = {
    Environment = "dev"
    Name = "crd_codebuild_tf"
  }
}
