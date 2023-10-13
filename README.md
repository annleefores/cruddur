
# Cruddur: A Twitter-Inspired Ephemeral Social Media

![GitHub Action](https://github.com/annleefores/aws-bootcamp-cruddur-2023/actions/workflows/lambda_nextjs.yaml/badge.svg)


## Introduction

**Cruddur** is a project designed to provide hands-on experience with cloud and DevOps practices while building a real-world, Twitter-inspired ephemeral social media platform. In Cruddur, users can post, view, and interact with messages, all of which have a limited lifespan and disappear after a specified time.

https://github.com/annleefores/cruddur/assets/10363107/c1dfd913-9372-401b-a57e-9a2363f86bd7

---

## Features

- User registration and authentication
- Posting and viewing messages
- Liking, commenting and resharing
- Ephemeral messages that disappear after a specified time
- Customizable user profiles

---

## Tech Stack

Cruddur leverages the following technologies to create a modern and scalable social media platform:

- **DevOps and Cloud Services:**
  - Docker for containerization
  - AWS ECS Fargate and ALB for scalable deployment
  - AWS Cognito for user authentication
  - AWS RDS for a managed relational database
  - AWS DynamoDB for a managed NoSQL database
  - CI/CD pipeline for automated deployments using AWS CodePipeline and GitHub actions
  - IaC tools - Terraform, CloudFormation, SAM, CDK
  - S3 for block storage
  - Lambda for one-off tasks
  - Bash scripts to automate DX
  - VPC
  - Route53

- **Frontend:**
  - Next.js
  - Tailwind CSS
  - Headless UI
  - React Hook Form and Zod (validation)
  - React Context for state management
  - SWR for client side data cache and mutation

- **Backend:**
  - Flask
  - Postgres
  - boto3 to interact with AWS
  - Logging and observability integrations

---

The project was created as part of the [Free AWS Cloud Project Bootcamp](https://aws.cloudprojectbootcamp.com/) organized by [Exampro](https://www.exampro.co/)


