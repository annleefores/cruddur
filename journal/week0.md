# Week 0 — Billing and Architecture

## Required Homework

- [Live Stream](#project-scenario)
- [Spend Considerations](#spend-considerations)
- [Security Considerations](#security-considerations)
- [Napkin Design](#create-conceptual-design)
- [Logical Design](#create-logical-design)
- [Create Admin User](#iam-user)
- [Use CloudShell](#cloudshell)
- [Generate AWS Credentials](#create-access-keys)
- [Installed AWS CLI](#install-aws-cli)
- [Create a Billing Alarm](#create-billing-alarm-using-aws-cli)
- [Create a Budget](#budget)

## Homework Challenges

- [Adding AWS_CLI_AUTO_PROMPT to .zshrc](#1-adding-aws_cli_auto_prompt-to-zshrc)
- [CI/CD Pipeline](#2-cicd-pipeline)
- [Use EventBridge to hookup Health Dashboard to SNS](#3-use-eventbridge-to-hookup-health-dashboard-to-sns)

---

## Getting Started

I began by completing all of the prerequisite tasks that I did not already know/have.

- Created a new AWS account with free tier benefits.
  - A neat trick I learned is that by using aliases, you can use the same email address to create multiple AWS accounts.
  - if your email is example@example.com, you can use example+something@example.com
- Did the free CCP course from Exampro to get familiar with AWS.
- Created Gitpod account.
- Created Momento Account.
- Obtained a Custom Domain Name from Porkbun.
- Signed up for Lucid Charts.
- Signed up for HoneyComb.io.
- Signed up for Rollbar.

---

## Project Scenario

The first thing I learned from the live session was how to understand the project and how an organization approaches it. The manner in which this is communicated via user personas has greatly aided my understanding of how things are done in an organization.

**Cruddur** is an ephemeral first micro blogging platform ( a lot like twitter but the posts are ephemeral like snapchat posts)

- Backend uses Flask micro web framework (Python)
- Frontend uses React
- The project includes
  - SQL and NoSQL Databases
  - Realtime Modern APIs
  - Multiple Container Services ( *Microservices)
  - A CI/CD Pipeline
  - Decentralized Authentication
  - And more


## Architecting Cloud

Before building out the project, clearly understand what the business wants, so discuss with technical and business team and make sure it meets all of the project's requirements..

It should address the risks, assumptions and constraints.

There are 3 stages to designing an architectural diagram.

1. Conceptual Design
2. Logical Design
3. Physical Design

### Conceptual Design

This is a high-level design that only shows the project's basic operation. Typically used to communicate an idea to business stakeholders or other non-technical members. Because it can be done on a napkin on the spur of the moment, this type of design is also known as a **Napkin Design**.

### Logical Design

Use the services provided by CSP to create a blueprint diagram of how each service is connected and used. Don't go into specifics about each service; just an icon and a name to indicate what it is. This is also referred to as a **Blueprint**.

### Physical Design

Represents the actual thing that is built, including the specifications of each service, IP address, ARN, API gateway, and so on.

### Things to remember

- Ask dump questions
- Assume you are an end user interacting with this service.
- Document everything !!!

## Frameworks

### TOGAF

An architectural framework that provides methods and tools to help with the acceptance, production, use, and maintenance of enterprise architecture. Similar to the AWS Well-Architected Tool.

### AWS Well-Architected Tool

An architectural framework provided by AWS to review your workloads against current best practices.  

6 pillars of AWS Well-Architected Tool:

1. Operational Excellence
2. Security
3. Reliability
4. Performance Efficiency
5. Cost Optimization
6. Sustainability

AWS offers a service to determine whether your project complies with the framework guidelines.

**How to use AWS Well Architected Framework Service ?**  
Using the AWS Well-Architecture Framework Service fill in all of the project's basic details before answering the checklists. These checklist questions are based on the AWS Well-Architected Framework. Based on these inputs, a report will be prepared in the end.

![AWS Well Architected Tool](media/week0/aws-well.png)

## Architectural Diagram

### [Lucid Chart](https://lucid.app/)

An online diagramming tool that's used in this bootcamp to create the diagrams. Has a limited free tier option.

_Other diagramming tools, guides and AWS assets can be found here [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/)_

**Adding AWS Icons**: Open a new document -> Import Data -> Shapes ->Select _AWS Architecture 2021_ (from Standard Libraries) -> Use Selected Shapes.

**Working with Lucid Charts**:

![lucid charts](media/week0/lucid-charts.png)

- Shapes sections contain a complete list of icons; use search to quickly locate icons.
- The toolbar contains all of the standard text and shape formatting tools.
- A document can contain multiple sheets.
- A page area to create diagrams
  - **Enable Infinite Canvas**:  Right click on page area -> page settings -> toggle Infinite canvas
  - **Enable Line Jumps**:   Right click on page area -> page settings -> Line Settings -> Show Line Jumps


### Create Conceptual Design

Create a conceptual design or napkin design of the project.

![curddur napkin design](media/week0/cruddur-napkin.png)

I made my own additions to the conceptual diagram by including systems to suggest follow users and a trending topic page.

### Create Logical Design

- Create a logical design using AWS icons, making sure to keep the designs consistent.
- For [**Momento**](https://www.gomomento.com/) icon, go to the official website and inspect the website for the icon svg code.
- Save the code as `filename.svg` using VScode
- When importing to Lucid, the icon fill color may not appear, so import the svg file inside [Figma](https://www.figma.com/) and then save it (This will fix any issue with the icon).
- **To import icon**: Import Data -> Shapes -> Import Shapes -> Add to new library -> Choose SVG file



- Use the icons to create logical diagram

**Logical Design**

![Logical Design](media/week0/crudder-logical.png)

**[Lucid Chart Design File Link ](https://lucid.app/lucidchart/1c59d211-6a78-496e-bb86-1db0faf0f6a1/edit?viewport_loc=-1416%2C111%2C3751%2C1823%2Cyv5w6~Ut2Wm0&invitationId=inv_27a0a80d-9325-4670-b7ec-59ff707f157e")**

I have added a serverless trending topic suggestion system which runs on frequent intervals, sorts trending topic by most used and then updates the trending page. This is one of the feature I use the most on twitter, so why not have it here.

I have not added the Serverless Avatar Image Processing pipeline since it is not confirmed to be a part of the project as of now.

---

## Security Considerations

Cyber security goal in an organization is to identify and inform any technical risks.  

- Protect data, applications and services associated with cloud.
- Reduce impact of breach and human errors
- Always stay up-to date of things happening in tech

## Adding MFA

- Root user is the most powerful user in an AWS account so its of the highest priority to secure this account
- MFA provides second layer of protection
- To set MFA -> profile -> security credentials -> set MFA
- Also add MFA to IAM user account.

![MFA](media/week0/mfa.png)

## Organization Unit

- Lets you manage everything centrally.
- Lets you create multiple, segregated accounts within an AWS account.
- There is no cost to AWS organisations

**Create OU(s)**  

- Go to AWS Organizations console and start creating OU inside root. Make sure name and tag them when doing so.
- You have the permission to rename, delete, move OU(s), nested OU(s).
- In most organizations OU(s) are created and set as standby OU(s) so that it can be allotted faster.

<p><img src="media/week0/ou-2.png" alt="Diagram I created following the video" width="70%" alt="multiple OUs"></p>

## AWS Cloud Trail

>Auditing service from AWS

<p><img src="media/week0/cloudtrail-1.png" alt="Diagram I created following the video" width="50%" alt="cloudtrail"></p>

- Records most of the API calls to your AWS account
- Can be used to monitor data security, auditing, etc.

**Create Cloud Trail**

I created a Trail following the tutorial and afterwards deleted it, Also deleted the KMS ( so that I don't incur cost for customer managed KMS) and deleted S3 bucket

![Trail](media/week0/cloudtrail-2.png)

## IAM User

User with lesser permission than root user. Its advised to create a IAM user and leave root user only for management related works

> Principle of least privilege

**Create IAM User**

- From IAM add user
- Add user to a group and tag
- Set MFA and Access Keys (for accessing AWS through CLI)

![IAM user](media/week0/iam-1.png)

## Roles & Policies

- Role is a type of IAM identity that can be authenticated and authorized to utilize an AWS resource
  - Role is specifically used to assign to an entity.  

- Policy defines the permissions of the IAM identity.
  - Policy apply to both a role and users/group

**Create Role**

- From IAM left pane select roles.
- When creating a new role choose AWS Services and EC2 for now.
- Select _AdministratorAccess_ policy (gives all admin access)

![IAM roles](media/week0/iam-roles.png)

**Attach Policy**

- From IAM left pane select policies
- Select _SecurityAudit_ (read only policy) policy and attach it to a role or a user group
- Another policy that can be attached is AmazonEC2FullAccess (only EC2 access)

![Attach Policy](media/week0/iam-policy.png)

## Service control policies (SCPs)

> A type of organization policy that you can use to manage permissions in your organization

[SCP](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

There are AWS managed and customer managed SCP policies
- SCPs can also be created

**SCP walkthrough**

- Search for SCP and go to features tab and select Service control policies (SCPs)
- or go to IAM and then to SCP
- or through OU

![SCP](media/week0/scp-1.png)

- Can create a new SCP policy and add this JSON file to prevent users from leaving OU

```bash
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Deny",
            "Action": [
                "organizations:LeaveOrganization"
            ],
            "Resource": "*"
        }
    ]
}
```

- SCP can be attached/detached to an account

## Top 5 Security Best Practices

- Data Protection & Residency in accordance to Security Policy
- Identity & Access Management with Least Privilege
- Governance & Compliance of AWS Services being used
  - Global vs Regional Services
  - Compliant Services
- Shared Responsibility of Threat Detection.
- Incident Response Plans to include Cloud

---

## Spend Considerations

> Different services have different cost and cost of each service varies based on region

View cost and services that are currently running

- Profile -> Billing Dashboard -> Bills (left pane)

Free tier usage

- Profile -> Billing Dashboard -> Free tier (left pane)

## CloudWatch Alarm

Notifies when cost threshold is breached.  

Manage Billing Alerts is the old method used to alert about spend newer one is budgets. 

10 alarms are free under free tier

![cloudwatch alarm](media/week0/cloudwatch-alarm.png)

## Budget

Notifies when  

1) your actual spend reaches 85%
2) your actual spend reaches 100%
3) if your forecasted spend is expected to reach 100%.

2 budgets for free under free tier

![budgets](media/week0/budgets.png)

## Cost allocation tags

- Profile -> Billing Dashboard -> Cost allocation tags (left pane)
- Tagging will help to calculate the cost of a system with different services that are all tagged by a common tag

![cost allocation tags](media/week0/cost-allocation-tags.png)

## Cost Explorer

- Profile -> Billing Dashboard -> Cost Explorer (left pane)
- Can see spend based on different filters like date, frequency, region, tag, services, etc.
- View reports and other features

![cost explorer](media/week0/cost-exp.png)

## AWS Credit

To redeem credits, view credit balance

- Profile -> Billing Dashboard -> Credits (left pane)

Certain credit is only applicable to few services

## AWS estimates calculator

[https://calculator.aws/](https://calculator.aws/)

- Calculate estimate cost for different services
- AWS Calculator provides estimate based on 730 hrs per month
- Pricing in real use case will vary based on usage

![aws calculator](media/week0/aws-calc.png)

## AWS Free Tier

To view details related to AWS free tier [https://aws.amazon.com/free](https://aws.amazon.com/free)

- Each services has different types of free options

---

## AWS Budgets

**Cost Budget**

Already covered [here](#budget)

**Usage Budget**

Budget alert based on usage amount in hours

![usage budget](media/week0/usage-budget.png)

**Credit Spent Alert**

Allows to send notification when credit usage crosses the threshold

![credit alert](media/week0/credit-alert.png)

## Create access keys

Access key to send API calls to AWS from CLI, SDKs, or direct API calls. 
Can be created from security credentials under profile

![access key](media/week0/access-key.png)

## CloudShell

AWS builtin terminal/shell. Only available in selected regions. Can be accessed from main console by clicking shell icon.

![cloudshell](media/week0/cloudshell.png)

**AWS CLI auto-prompt**

If enabled, the auto-prompt enables you to use the ENTER key to complete a partially entered command.

- To enable it run `aws --cli-auto-prompt` (only works for a single line)

![cli auto prompt](media/week0/auto-prompt.png)

## Install AWS CLI

- Open repo in gitpod
- `cd..` to go back one file
- run AWS CLI install in linux command

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

- Next step is to run `aws configure` and add the access details, region
- But for gitpod, since the data outside workspace is not persistent it can't persist the AWS CLI installation or Access configure we need to do some additional configurations.

- To make env persistent in gitpod run env variable commands like this   
`gp env VARIABLE_NAME="VALUE"`
  - AWS_ACCESS_KEY_ID="VALUE"
  - AWS_SECRET_ACCESS_KEY="VALUE"
  - AWS_DEFAULT_REGION="VALUE"

- To auto install AWS CLI add this to `.gitpod.yml` file.

```yaml
tasks:
  - name: aws-cli
    env:
      AWS_CLI_AUTO_PROMPT: on-partial
    init: |
      cd /workspace
      curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
      unzip awscliv2.zip
      sudo ./aws/install
      cd $THEIA_WORKSPACE_ROOT
```

![gitpod config](media/week0/gitpod-config.png)

- Now every time gitpod workspace is booted up it will auto install AWS CLI and use the saved env variables

![gitpod env variables](media/week0/gitpod-variables.png)

- When AWS command is run, it will output data specific to our account as shown below

```
gitpod /workspace/aws $ aws sts get-caller-identity
{
    "UserId": "AIDAW-Redacted",
    "Account": "453-Redacted",
    "Arn": "arn:aws:iam::453-Redacted:user/annlee"
}
```

## Create AWS Budget using AWS CLI

Following the tutorial steps I was able to add a new AWS budget alert using CLI

![gitpod screenshot](media/week0/gitpod.png)

![Budget Screenshot](media/week0/aws-cli-1.png)

## Create Billing Alarm using AWS CLI

Following the tutorial steps I was able to Create SNS Topic and add a new AWS billing alarm using CLI

![SNS topic](media/week0/sns-topic.png)

![cloudwatch alarm cli](media/week0/cloudwatch-alarm-cli.png)

![cloudwatch alarm console](media/week0/cloudwatch-alarm-cli-2.png)

---

## Homework Challenges


### 1. Adding AWS_CLI_AUTO_PROMPT to .zshrc

I added AWS_CLI_AUTO_PROMPT to ZSH shell and exported it to ~/.zshrc so that is auto runs every time I load ZSH on my local machine

- `nvim ~/.zshrc`
- Add this line `export AWS_CLI_AUTO_PROMPT="on-partial"` to the end of the `.zshrc` file
- run `source ~/.zshrc`

**Reference:**  
[AWS Docs - AWS_CLI_AUTO_PROMPT](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html#envvars-list-aws_cli_auto_prompt)

### 2. CI/CD Pipeline

![Alt text](media/week0/cicd.png)

**[Link to lucid charts](https://lucid.app/lucidchart/fc60068a-37cb-46c7-a46f-49b174b434fa/edit?viewport_loc=-277%2C-352%2C2502%2C1216%2C0_0&invitationId=inv_aaafa779-b369-484b-9736-87d5d365967b)**

My take on a CI/CD pipeline for Cruddur.

- Developer pushes changes to github repo.
- Github actions test and builds application.
- Store container image in ECR.
- Deploy application using AWS CodeDeploy.

**Reference:**  
[Integrating with github actions](https://aws.amazon.com/blogs/devops/integrating-with-github-actions-ci-cd-pipeline-to-deploy-a-web-app-to-amazon-ec2/)  
[Automated software delivery using Docker Compose and Amazon ECS](https://aws.amazon.com/blogs/containers/automated-software-delivery-using-docker-compose-and-amazon-ecs/)

### 3. Use EventBridge to hookup Health Dashboard to SNS

**Using Console**

- Create a SNS topic
- Go to **AWS Health Dashboard**
- Click on **Amazon EventBridge rule Configure**
- Give a name and description
- Keep the default values for **Event bus** and **Rule type**, and then choose **Next**.
- Under **Event pattern**, for **Event source**, choose **AWS services**.
- Under **Event pattern**, for **AWS service**, choose **Health**.
- For **Event type,** choose **Specific Health events**
- choose **Specific service(s)**
- Fill up the rest as shown in the image

![Alt text](media/week0/eventbridge-1.png)

- Choose **Any resource** to create a rule that applies to all resources.
- Choose **Next**
- On the **Select target(s)** page, choose AWS service, select a target ⇒ SNS topic and topic ⇒ set to the topic you created earlier

![Alt text](media/week0/eventbridge-2.png)

- Choose **Next**.
- Add tags
- **Review and create**

![Alt text](media/week0/eventbridge-3.png)



**Using AWS CLI**

TODO

EventBridge monitors for all EC2 events and notifies if there’s any issue

**Reference:**  
[Creating event bridge events rule for aws health](https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html#creating-event-bridge-events-rule-for-aws-health)