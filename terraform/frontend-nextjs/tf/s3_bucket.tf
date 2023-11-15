resource "aws_s3_bucket" "cdn_bucket" {
  bucket        = var.CDN_DOMAIN
  force_destroy = true


  tags = {
    Name = "Nextjs CDN Bucket"
  }
}

resource "aws_s3_bucket_ownership_controls" "bucket_ownership" {
  bucket = aws_s3_bucket.cdn_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "cdn_bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.bucket_ownership]

  bucket = aws_s3_bucket.cdn_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "cloudfront_bucket_policy" {
  bucket = aws_s3_bucket.cdn_bucket.id
  policy = data.aws_iam_policy_document.s3_bucket_policy.json

}

data "aws_iam_policy_document" "s3_bucket_policy" {
  statement {

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.cdn_bucket.arn}/*",
    ]

    condition {
      test     = "ForAnyValue:StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

locals {
  STATIC_SRC = "${var.SOURCE_DIR}/static"
}

# Calculates hash of the files in static folder to trigger s3 file changes
resource "null_resource" "s3_data" {
  depends_on = [aws_s3_bucket.cdn_bucket]
  triggers = {
    src_hash = sha1(join("", [for f in fileset(local.STATIC_SRC, "**") : filesha1("${local.STATIC_SRC}/${f}")]))
  }

  # Deleted previous files from S3
  provisioner "local-exec" {
    command = "echo 'Deleting old files....' && aws s3 rm s3://${var.CDN_DOMAIN}/_next/static/ --recursive --region ${var.REGION} >/dev/null"
  }
  # Copy new files to S3
  provisioner "local-exec" {
    command = "echo 'Copying new files....' && aws s3 cp ${local.STATIC_SRC} s3://${var.CDN_DOMAIN}/_next/static/ --recursive --region ${var.REGION} >/dev/null"
  }
  # Create Cloudfront invalidation
  provisioner "local-exec" {
    command = "echo 'Creating cloudfront invalidation....' &&  aws cloudfront create-invalidation --distribution-id ${aws_cloudfront_distribution.s3_distribution.id} --paths /_next/static/** >/dev/null"
  }
}
