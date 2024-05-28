terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.45.0"
    }
  }

  backend "s3" {
    bucket         = "hhavr-terraform-state"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "dynamolock-hhavr-terraform-state"
    encrypt        = true
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "hh_ec2_security_group" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"

  ingress =[{
    description      = "SSH from anywhere"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  },
    {
    description      = "HTTP from anywhere"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  },
  {
    description      = "HTTPS from anywhere"
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }]


  egress =[{
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  },
  {
    from_port        = 443
    to_port          = 443
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }]

}

resource "aws_instance" "hh_ec2" {
  ami           = "ami-0bb84b8ffd87024d8" 
  instance_type = "t2.micro"
  key_name      = "my2key"

  security_groups = [aws_security_group.hh_ec2_security_group.name]

  root_block_device {
    volume_size = 8 # 8GB
  }
}

resource "aws_s3_bucket" "hh_bucket" {
  bucket = "hhubportal" # Make sure this is globally unique
  
}

resource "aws_s3_bucket_ownership_controls" "hh_bucket_ownership_controls" {
  bucket = aws_s3_bucket.hh_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
  depends_on = [aws_s3_bucket_public_access_block.hh_bucket_public_access_block]
}

resource "aws_s3_bucket_public_access_block" "hh_bucket_public_access_block" {
  bucket = aws_s3_bucket.hh_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "hh_bucket_acl" {
  bucket = aws_s3_bucket.hh_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "hh_bucket_website" {
  bucket = aws_s3_bucket.hh_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_policy" "hh_bucket_policy" {
  bucket = aws_s3_bucket.hh_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid       = "AllowPublicReadAcess",
        Effect    = "Allow",
        Principal = "*",
        Action    = "s3:GetObject",
        Resource  = "${aws_s3_bucket.hh_bucket.arn}/*"
      },
    ],
  })
}


output "ec2_instance_public_ip" {
  value = aws_instance.hh_ec2.public_ip
  description = "The public IP of the EC2 instance"
}

output "website_endpoint" {
  description = "The DNS name of the website."
  value       = aws_s3_bucket_website_configuration.hh_bucket_website.website_endpoint
}
