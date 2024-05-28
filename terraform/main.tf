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

resource "aws_ecr_repository" "app_ecr_repo" {
  name = "hh-repo"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_ecs_cluster" "my_cluster" {
  name = "hh-cluster"
}

resource "aws_default_vpc" "default_vpc" {}

resource "aws_iam_role" "ecsTaskExecutionRole" {
  name               = "ecsTaskExecutionRole"
  assume_role_policy = data.aws_iam_policy_document.assume_role_policy.json
  lifecycle {
    prevent_destroy = true
  }
}

data "aws_iam_policy_document" "assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
  role       = aws_iam_role.ecsTaskExecutionRole.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_ecs_task_definition" "app_task" {
  family                   = "hh-family-task"
  container_definitions    = jsonencode([
    {
      name      = "hh-client"
      image     = "${aws_ecr_repository.app_ecr_repo.repository_url}:client"
      essential = true
      portMappings = [
        {
          containerPort = 80
        }
      ]
    },
    {
      name      = "hh-server"
      image     = "${aws_ecr_repository.app_ecr_repo.repository_url}:server"
      essential = true
      portMappings = [
        {
          containerPort = 8080
        }
      ]
    }
  ])
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  memory                   = 512
  cpu                      = 256
  execution_role_arn       = aws_iam_role.ecsTaskExecutionRole.arn
}

resource "aws_default_subnet" "default_subnet_a" {
  availability_zone = "us-east-1a"
  depends_on = [
    aws_default_vpc.default_vpc
  ]
}

resource "aws_default_subnet" "default_subnet_b" {
  availability_zone = "us-east-1b"
  depends_on = [
    aws_default_vpc.default_vpc
  ]
}

resource "aws_security_group" "load_balancer_security_group" {
  name        = "load_balancer_sg"
  description = "Security group for ALB and ECS service"
  vpc_id      = aws_default_vpc.default_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_alb" "application_load_balancer" {
  name               = "hh-alb"
  load_balancer_type = "application"
  subnets            = [
    aws_default_subnet.default_subnet_a.id,
    aws_default_subnet.default_subnet_b.id
  ]
  security_groups    = [aws_security_group.load_balancer_security_group.id]
}

resource "aws_lb_target_group" "frontend_target_group" {
  name        = "frontend-target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_default_vpc.default_vpc.id
}

resource "aws_lb_target_group" "backend_target_group" {
  name        = "backend-target-group"
  port        = 8080
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_default_vpc.default_vpc.id
}

resource "aws_lb_listener" "listener" {
  load_balancer_arn = aws_alb.application_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend_target_group.arn
  }
}

resource "aws_lb_listener_rule" "backend_listener_rule" {
  listener_arn = aws_lb_listener.listener.arn
  priority     = 2

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_target_group.arn
  }

  condition {
    path_pattern {
      values = ["/api/*"]
    }
  }
}

resource "aws_security_group" "service_security_group" {
  name        = "ecs_service_sg"
  description = "Security group for ECS service"
  vpc_id      = aws_default_vpc.default_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_ecs_service" "app_service" {
  name            = "hh-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.app_task.arn
  launch_type     = "FARGATE"
  desired_count   = 1

  load_balancer {
    target_group_arn = aws_lb_target_group.frontend_target_group.arn
    container_name   = "hh-client"
    container_port   = 80
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backend_target_group.arn
    container_name   = "hh-server"
    container_port   = 8080
  }

  network_configuration {
    subnets          = [aws_default_subnet.default_subnet_a.id, aws_default_subnet.default_subnet_b.id]
    assign_public_ip = true
    security_groups  = [aws_security_group.service_security_group.id]
  }
}

output "app_url" {
  value = aws_alb.application_load_balancer.dns_name
}
