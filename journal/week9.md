# Week 9 — CI/CD with CodePipeline, CodeBuild and CodeDeploy

## [Required Homework](#required-homework-1)

- [Configuring CodePipeline](#codepipeline)
- [Configuring CodeBuild Part 1](#codebuild-project)
- [Add Build stage to Pipeline](#add-build-stage-to-pipeline)
- [CICD Pipeline Security](#ci-cd-pipeline-security-explained-for-aws)

## [Homework Challenges](#homework-challenges-1)

- [Parameter store value in buildspec](#parameter-store-values-in-build-spec)
- [ECR CodeBuild Permissions](#ecr-codebuild-permissions)
- [Create test build and add step to codePipeline](#create-test-build-and-add-step-to-codepipeline)

## Required Homework

### CodePipeline

- Create a pipeline with the name **cruddur-backend-fargate**.

Note: Artifacts are used to store outputs from different stages of the pipeline, and data moves through different phases using artifacts, which are stored in S3.

- Choose **GitHub (version 2)** as the source provider.
- Connect to GitHub by clicking on **Connect to GitHub** and name the connection as **cruddur**.
- Install a new app, choose the GitHub organization, and select **Only select repositories** to select the Cruddur repo.
- Once the installation is complete, click on **Connect**.
- Choose the repository name and create a new `prod` branch in the Cruddur GitHub repo.
- Select **Branch name** as `prod` in CodePipeline.
- Make sure to check the box for **Start the pipeline on source code change**.
- Select **CodePipeline default** in the **Output artifact format**.
- Click on **Next** and skip the build stage for now.
- Choose **Amazon ECS** as the **Deploy provider**.
- Select **cruddur** from the dropdown for the cluster name.
- Enter **backend-flask** as the service name and click **Next**.
- Click on **Create Pipeline** to finish.

![create-pipeline](media/week9/images/1-create-pipeline.png)

### CodeBuild Project

- To create a new build project, go to CodeBuild.
- Use the project name `cruddur-backend-flask-bake-image`.
- Enable the build badge to make the build status visible on the GitHub repo.
- Set the **Source provider** to **GitHub** and connect to GitHub using OAuth.
- Once the authentication is complete, select **Repository in my GitHub account**.
- Choose the **Cruddur GitHub Repo**.
- Set the Source version to **Prod** (optional).
- Check the **Rebuild every time a code change is pushed to this repository** checkbox in the **Primary source webhook events** section.
- Choose **PULL_REQUEST_MERGED** in the **Event type** dropdown.
- In the **Environment image: Managed Image** section, select the operating system as **Amazon Linux 2**.
- Set the runtime to **Standard**.
- Choose the latest image for **Image**.
- Check the **Enable this flag if you want to build Docker images or want your builds to get elevated privileges** checkbox.
- In the **Additional configuration** section, set the **Timeout** to 15 minutes.
- For ENV VARS, create a `buildspec.yaml` file.
- In the **Buildspec** section, choose **Use a buildspec file** and set the **Buildspec name - optional** to `backend-flask/buildspec.yml`.
- Turn on **CloudWatch Logs**.
- Click on **Create build project**.

![build](media/week9/images/2-build.png)

### `buildspec.yml`

Some programs require the extension to be yaml or yml. In this case, it must be yml.

- Create `backend-flask/buildspec.yml`

```yaml
# Buildspec runs in the build stage of your pipeline.
version: 0.2
phases:
  install:
    runtime-versions:
      docker: 20
    commands:
      - echo "cd into $CODEBUILD_SRC_DIR/backend"
      - cd $CODEBUILD_SRC_DIR/backend-flask
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $IMAGE_URL
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build -t backend-flask .
      - "docker tag $REPO_NAME $IMAGE_URL/$REPO_NAME"
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker image..
      - docker push $IMAGE_URL/$REPO_NAME
      - cd $CODEBUILD_SRC_DIR
      - echo "imagedefinitions.json > [{\"name\":\"$CONTAINER_NAME\",\"imageUri\":\"$IMAGE_URL/$REPO_NAME\"}]" > imagedefinitions.json
      - printf "[{\"name\":\"$CONTAINER_NAME\",\"imageUri\":\"$IMAGE_URL/$REPO_NAME\"}]" > imagedefinitions.json

env:
  variables:
    AWS_DEFAULT_REGION: us-east-1
    CONTAINER_NAME: backend-flask
    REPO_NAME: backend-flask:latest

  parameter-store:
    AWS_ACCOUNT_ID: "/cruddur/backend-flask/AWS_ACCOUNT_ID"
    IMAGE_URL: "/cruddur/backend-flask/BACKEND_IMAGE_URL"

artifacts:
  files:
    - imagedefinitions.json
```

I have stored sensitive information in the parameter store and used the parameter store values in the `buildspec.yml` to fetch them securely.

To allow CodeBuild to retrieve custom environment variables stored in Amazon EC2 Systems Manager Parameter Store, you need to add the `ssm:GetParameters` action to the CodeBuild service role.

### Add Build stage to Pipeline

- In CodePipeline, select the created pipeline and click **Edit**.
- Add a stage between **Source** and **Deploy**.
- Stage name = build
- **Add action group:**
  - Action name = bake
  - Action provider = AWS CodeBuild
  - Input artifacts = SourceArtifact
  - Select the created build stage for Project Name
  - Output artifacts = **imageDefinition**
  - Click **Done**
- Edit the Deploy stage and change its input artifacts to **imageDefinition**.
- **Save pipeline changes**.

### Run Pipeline

- Click **Release Changes** to run the pipeline

![pipeline-update](media/week9/images/3-pipeline-update.png)

⚠️ Make sure to keep the ECS Fargate services running for deployment to work.

![deployment-success](media/week9/images/4-deployment-success.png)

### Test Deployment

Update return in app.py health check like this to return something new.

```bash
return {"success": True, "ver": 1}, 200
```

Push the changes to prod and visit API health check URL

![checking-deploy](media/week9/images/5-checking-deploy.png)

### CI CD Pipeline SECURITY EXPLAINED FOR AWS

**What is a CI/CD Pipeline**

- CI → Continuous Integration
- CD → Continuous Delivery / Continuous Deployment
- Deploy code into production many time without manually building and testing

What AWS Services can help with CI/CD

- CodeCommit
- CodeBuild
- CodeDeploy
- CodePipeline - CI/CD Flow orchestrater

Non AWS Code Repo’s: GitLab, GitHub, Bitbucket

**Simple CI/CD Pipeline Architecture**

![codepipline](media/week9/images/6-codepipline.png)

**Security Considerations**

- Check for any secrets
- Linting
- Analyze application for security

**OWASP Top 10 CI/CD**

- Insufficient Flow Control Mechanisms
- Inadequate Identity and Access Management
- Dependency Chain Abuse
- Poisoned Pipeline Execution (PPE)
- Insufficient PBAC (Pipeline-Based Access Controls)
- Insufficient Credential Hygiene
- Insecure System Configuration
- Ungoverned Usage of 3rd Party Services
- Improper Artifact Integrity Validation
- Insufficient Logging and Visibility

**AWS Side Security Considerations**

- Compliance standard is what your business requires from a CI/CD service and is available in the region you need to operate in
- Amazon Organizations SCP - to restrict actions like creation, deletion, modification of production CI/CD pipeline services etc
- AWS CloudTrail is enabled & monitored to trigger alerts for malicious activities e.g changes to Production CodePipeline, etc
- GuardDuty is enabled for monitoring suspicious DNS comms (e.g Crypto-mining etc) and automated for auto-remediation.
- AWS Config Rules is enabled in the account and region of CodeBuild - Conformance pack for any other CI/CD service

**Application Side Security Considerations**

- Access Control - Roles or IAM Users for making changes in Amazon CICD services especially production related repositories, pipeline, build services).
- Security of the CI/CD Pipeline - source control, secret management, container registry, CI/CD service (if not the AWS service), IAM etc
- Security in the CI/CD Pipeline - Code Security Best Practices - SCA, SAST, Secret Scanner, DAST implemented in the CI/CD Pipeline
- Security of the CI/CD Pipeline entry points e.g - no bypass of CI/CD to
  make production changes
- Enable Encryption in Transit using TLS/SSL certification e.g HTTPS
- Only use Trusted Source Control for sending changes to CI/CD Pipeline
- Develop process for continuously verifying if there is a change that may compromise the known state of a CI/CD pipeline

---

## Homework Challenges

### Parameter store values in build spec

Instead of directly embedding the AWS Account ID, I decided to use Parameter Store.

To allow CodeBuild to retrieve custom environment variables stored in Amazon EC2 Systems Manager Parameter Store, you need to add the `ssm:GetParameters` action to the CodeBuild service role.

So, I added an inline policy to the service role with this action.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "ssm:GetParameters",
      "Resource": "arn:aws:ssm:us-east-1:<AWS_ACCOUNT_ID>:parameter/cruddur*"
    }
  ]
}
```

Reference:

- [Systems Manager Parameter Store access](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-access.html)

### ECR CodeBuild permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:CompleteLayerUpload",
        "ecr:GetAuthorizationToken",
        "ecr:InitiateLayerUpload",
        "ecr:PutImage",
        "ecr:UploadLayerPart",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ],
      "Resource": "*"
    }
  ]
}
```

Reference:

- [Docker sample for CodeBuild](https://docs.aws.amazon.com/codebuild/latest/userguide/sample-docker.html)

### Create Test Build and Add Step to CodePipeline

**Creating sample test in backend-flask using pytest**

- Install pytest by running `pip3 install pytest` and add it to requirements.txt
- Create a `tests/` folder in the backend flask directory.
- Inside the `backend-flask/tests/` directory, create a `conftest.py` file to configure pytest.

```python
import pytest
from app import app as flask_app

@pytest.fixture()
def app():
    yield flask_app

@pytest.fixture()
def client(app):
    return app.test_client()
```

- Inside the `backend-flask/tests/` directory, create a `test_project.py` file to configure tests. Note that the file name can be anything, but it should start with `test_`. Additionally, the function names should also start with `test_`.

```python
def test_health(client):
    response = client.get("/api/health-check")
    assert response.status_code == 200

def test_notifications(client):
    response = client.get("/api/activities/notifications")
    assert response.status_code == 200
    assert response.json["data"][0]["handle"] == "Tron"

def test_home(client):
    response = client.get("/api/activities/home")
    assert response.status_code == 200
    assert response.json["data"][0]["handle"] == "annleefores"
```

- To make Python recognize the `tests/` folder as a package, create a file called `__init__.py` inside the folder.
- Run pytest to test the Flask application.

```python
❯ pytest
========================= test session starts ==========================
platform linux -- Python 3.10.6, pytest-7.3.1, pluggy-1.0.0
rootdir: /**/aws-bootcamp-cruddur-2023/backend-flask
plugins: postgresql-4.1.1
collected 3 items

tests/test_project.py ..                                         [100%]

========================== 3 passed in 0.04s ===========================
```

**Buildspec.yaml**

```python
#buildspec for testing backend-flask

version: 0.2
phases:
  install:
    runtime-versions:
      python: 3.x
    commands:
      - echo "cd into $CODEBUILD_SRC_DIR/backend"
      - echo "Installing PostgreSQL"
      - yum install -y postgresql
      - cd $CODEBUILD_SRC_DIR/backend-flask
      - pip3 install -r requirements.txt

  pre_build:
    commands:
      - echo "Starting PostgreSQL"
      - docker pull postgres:13-alpine
      - docker run -e POSTGRES_PASSWORD=password -e POSTGRES_USER=postgres -d -p 5432:5432 postgres:13-alpine
      - sleep 15

  build:
    commands:
      - echo "exporting and testing"
      - export CONNECTION_URL="postgresql://postgres:password@localhost:5432/cruddur"
      - export ABS_PATH=$CODEBUILD_SRC_DIR
      - cd $CODEBUILD_SRC_DIR
      - bash ./bin/db/create
      - bash ./bin/db/schema-load
      - bash ./bin/db/seed
      - cd $CODEBUILD_SRC_DIR/backend-flask/tests
      - python -m pytest

env:
  variables:
    AWS_DEFAULT_REGION: us-east-1
    FRONTEND_URL: http://localhost:3000
    BACKEND_URL: http://localhost:4567

  parameter-store:
    AWS_COGNITO_USER_POOL_CLIENT_ID: /cruddur/backend-flask/AWS_COGNITO_USER_POOL_CLIENT_ID
    AWS_COGNITO_USER_POOL_ID: /cruddur/backend-flask/AWS_COGNITO_USER_POOL_ID
    AWS_USER_POOLS_ID: /cruddur/backend-flask/AWS_COGNITO_USER_POOL_ID
```

**Add Test Build Stage**

To add a new stage to the backend pipeline in the CodePipeline console:

- Select the backend pipeline and click on **Edit**.
- Click on **Add stage** below the **Source** stage and name the new stage **Test**. Click **Create** to create the stage.
- Add an action group to this new stage with the following settings:
  - Action name = **Test**
  - Action provider = **CodeBuild**
  - Input artifacts = **SourceArtifact**
  - Click **Create Project** under **Project Name**.
- Create a new CodeBuild project with the following settings:
  - Name = **cruddur-backend-flask-test**
  - Environment image = **Managed Image** with operating system set to **Amazon Linux 2**
  - Use the same steps as the Build stage.
  - Under **Buildspec**, choose **Use a buildspec file** and set **Buildspec name - optional** to `backend-flask/tests/buildspec.yml`.
  - Click **Continue to CodePipeline**.
- Click **Done** and save the pipeline changes.
- Add `ssm:GetParameters` permission to the Build stage service role.

**Testing**

- Merge the new code changes to the production branch.
- Check the test build logs.

Initially, the plan was to run PSQL DB within CodeBuild, but I ran into a lot of issues with that approach. So, I decided to run the PSQL server as a Docker container inside CodeBuild.

I could have just used the RDS database, but then I would have to keep it running all the time I push changes to production.

I had to update the Flask route return to `{"data": data}, 200` for pytest to work in CodeBuild.

![build-test](media/week9/images/7-build-test.png)

![test-pipeline](media/week9/images/8-test-pipeline.png)

**Reference:**

- [How to Add a Test Stage to a Pipeline in CodePipeline](https://docs.aws.amazon.com/codebuild/latest/userguide/how-to-create-pipeline-add-test.html)
- [How to Create a Pipeline in CodePipeline](https://docs.aws.amazon.com/codebuild/latest/userguide/how-to-create-pipeline.html)
- [Flask Testing with pytest](https://testdriven.io/blog/flask-pytest/)
- [Testing Flask Framework with pytest](https://circleci.com/blog/testing-flask-framework-with-pytest/)
- [Testing Flask Applications — Flask Documentation (2.0.x)](https://flask.palletsprojects.com/en/2.2.x/testing/)
