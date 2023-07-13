# Week X — Final

## Required Homework

- [Sync tool for static website hosting](#sync-tool-for-static-website-hosting)

## Homework Challenges

- [GitHub Actions Frontend Sync](#github-actions-frontend-sync)
---

## Required Homework

### Sync tool for static website hosting

#### Setting up frontend build

Create a static build bash script for frontend and chmod it  

```bash
#! /usr/bin/bash

ABS_FILEPATH="$ABS_PATH/frontend-react-js/"
DIR=$(realpath --relative-base="$PWD" "$ABS_FILEPATH")

cd $DIR

npm run build
```

Create a file named `.env.production` within the frontend directory and include all the environment variables specific to the frontend.

Execute the build script to generate a production build of the React app with the embedded environment variables.

### Upload Build Files to CloudFront S3 Bucket

- Upload the build files to the bucket associated with the root domain.
- Visit the domain to access and view the static frontend website.

### S3 Sync Tool

Create a file named `sync` within the `bin/frontend` directory.

```bash
#!/usr/bin/env ruby

require 'aws_s3_website_sync'
require 'dotenv'

env_path = File.expand_path('../../../sync.env', __FILE__)
Dotenv.load(env_path)

puts ">>> configuration <<<"
puts "aws_default_region:      #{ENV["AWS_DEFAULT_REGION"]}"
puts "s3_bucket:               #{ENV["SYNC_S3_BUCKET"]}"
puts "distribution_id:         #{ENV["SYNC_CLOUDFRONT_DISTRUBTION_ID"]}"
puts "build_dir:               #{ENV["SYNC_BUILD_DIR"]}"

changeset_path = ENV["SYNC_OUTPUT_CHANGESET_PATH"]
changeset_path = changeset_path.sub(".json","-#{Time.now.to_i}.json")

puts "output_changset_path: #{changeset_path}"
puts "auto_approve:         #{ENV["SYNC_AUTO_APPROVE"]}"

puts "sync =="
AwsS3WebsiteSync::Runner.run(
  aws_access_key_id:     ENV["AWS_ACCESS_KEY_ID"],
  aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
  aws_default_region:    ENV["AWS_DEFAULT_REGION"],
  s3_bucket:             ENV["SYNC_S3_BUCKET"],
  distribution_id:       ENV["SYNC_CLOUDFRONT_DISTRUBTION_ID"],
  build_dir:             ENV["SYNC_BUILD_DIR"],
  output_changset_path:  changeset_path,
  auto_approve:          ENV["SYNC_AUTO_APPROVE"],
  silent: "ignore,no_change",
  ignore_files: [
    'stylesheets/index',
    'android-chrome-192x192.png',
    'android-chrome-256x256.png',
    'apple-touch-icon-precomposed.png',
    'apple-touch-icon.png',
    'site.webmanifest',
    'error.html',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'robots.txt',
    'safari-pinned-tab.svg'
  ]
)
```

Install the required dependency by executing the command `gem install aws_s3_website_sync dotenv`.

Create a new erb file named `sync.env.erb` to generate the environment variables.

```toml
SYNC_S3_BUCKET=
SYNC_CLOUDFRONT_DISTRUBTION_ID=
SYNC_BUILD_DIR=<%= ENV['THEIA_WORKSPACE_ROOT'] %>/frontend-react-js/build
SYNC_OUTPUT_CHANGESET_PATH=<%=  ENV['THEIA_WORKSPACE_ROOT'] %>/tmp/sync-changeset.json
SYNC_AUTO_APPROVE=false
```

Add this to the `frontend generate-env` script.

```ruby
template = File.read 'erb/sync.env.erb'
content = ERB.new(template).result(binding)
filename = "sync.env"
File.write(filename, content)
```

Run the script to generate the `sync.env` file in the root directory.

Execute the static-build script, followed by the sync script. Confirm the upload of the contents to S3 and the invalidation of the CloudFront cache.

### GitHub Action CICD - Frontend

Create two files, Gemfile and Rakefile, in the root of the project.

- Gemfile

```ruby
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rake'
gem 'aws_s3_website_sync', tag: '1.0.1'
gem 'dotenv', groups: [:development, :test]
```

- Rakefile

```ruby
require 'aws_s3_website_sync'
require 'dotenv'

task :sync do
  puts "sync =="
  AwsS3WebsiteSync::Runner.run(
    aws_access_key_id:     ENV["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
    aws_default_region:    ENV["AWS_DEFAULT_REGION"],
    s3_bucket:             ENV["S3_BUCKET"],
    distribution_id:       ENV["CLOUDFRONT_DISTRUBTION_ID"],
    build_dir:             ENV["BUILD_DIR"],
    output_changset_path:  ENV["OUTPUT_CHANGESET_PATH"],
    auto_approve:          ENV["AUTO_APPROVE"],
    silent: "ignore,no_change",
    ignore_files: [
      'stylesheets/index',
      'android-chrome-192x192.png',
      'android-chrome-256x256.png',
      'apple-touch-icon-precomposed.png',
      'apple-touch-icon.png',
      'site.webmanifest',
      'error.html',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'favicon.ico',
      'robots.txt',
      'safari-pinned-tab.svg'
    ]
  )
end
```

Create a directory named `.github/workflows`. Inside this directory, create a YAML file called `sync.yaml`.

```yaml
name: Sync-Prod-Frontend

on:
  push:
    branches: [prod]
  pull_request:
    branches: [prod]

jobs:
  build:
    name: Statically Build Files
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18.x]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: cd frontend-react-js
      - run: npm ci
      - run: npm run build
  deploy:
    name: Sync Static Build to S3 Bucket
    runs-on: ubuntu-latest
    # These permissions are needed to interact with GitHub's OIDC Token endpoint.
    permissions:
      id-token: write
      contents: read
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Configure AWS credentials from Test account
        uses: aws-actions/configure-aws-credentials@v2
        with:
          role-to-assume: arn:aws:iam::<AWS_ACCOUNT_ID>:role/CrdSyncRole-Role-15HSTGN6QSC9D
          aws-region: us-east-1
      - uses: actions/checkout@v3
      - name: Set up Ruby
        uses: ruby/setup-ruby@ec02537da5712d66d4d50a0f33b7eb52773b5ed1
        with:
          ruby-version: "3.1"
      - name: Install dependencies
        run: bundle install
      - name: Run tests
        run: bundle exec rake sync
```

Create a CloudFormation (CFN) template to deploy the necessary permissions and other resources required to establish the connection between GitHub actions and AWS.

Create two files, `aws/cfn/sync/template.yaml` and `config.toml`.

```yaml
AWSTemplateFormatVersion: 2010-09-09
Parameters:
  GitHubOrg:
    Description: Name of GitHub organization/user (case sensitive)
    Type: String
  RepositoryName:
    Description: Name of GitHub repository (case sensitive)
    Type: String
    Default: 'aws-bootcamp-cruddur-2023'
  OIDCProviderArn:
    Description: Arn for the GitHub OIDC Provider.
    Default: ""
    Type: String
  OIDCAudience:
    Description: Audience supplied to configure-aws-credentials.
    Default: "sts.amazonaws.com"
    Type: String

Conditions:
  CreateOIDCProvider: !Equals 
    - !Ref OIDCProviderArn
    - ""

Resources:
  Role:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Statement:
          - Effect: Allow
            Action: sts:AssumeRoleWithWebIdentity
            Principal:
              Federated: !If 
                - CreateOIDCProvider
                - !Ref GithubOidc
                - !Ref OIDCProviderArn
            Condition:
              StringEquals:
                token.actions.githubusercontent.com:aud: !Ref OIDCAudience
              StringLike:
                token.actions.githubusercontent.com:sub: !Sub repo:${GitHubOrg}/${RepositoryName}:*

  GithubOidc:
    Type: AWS::IAM::OIDCProvider
    Condition: CreateOIDCProvider
    Properties:
      Url: https://token.actions.githubusercontent.com
      ClientIdList: 
        - sts.amazonaws.com
      ThumbprintList:
        - 6938fd4d98bab03faadb97b34396831e3780aea1

Outputs:
  Role:
    Value: !GetAtt Role.Arn
```

```toml
[deploy]
bucket = ''
region = ''
stack_name = 'CrdSyncRole'

[parameters]
GitHubOrg = ''
RepositoryName = 'aws-bootcamp-cruddur-2023'
OIDCProviderArn = ''
```

Create a script to deploy this template

```bash
#! /usr/bin/bash

set -e # stop execution if anything fails

abs_template_filepath="$ABS_PATH/aws/cfn/sync/template.yaml"
TemplateFilePath=$(realpath --relative-base="$PWD" "$abs_template_filepath")

abs_config_filepath="$ABS_PATH/aws/cfn/sync/config.toml"
ConfigFilePath=$(realpath --relative-base="$PWD" "$abs_config_filepath")

BUCKET=$(cfn-toml key deploy.bucket -t $ConfigFilePath)
REGION=$(cfn-toml key deploy.region -t $ConfigFilePath)
STACK_NAME=$(cfn-toml key deploy.stack_name -t $ConfigFilePath)
PARAMETERS=$(cfn-toml params v2 -t $ConfigFilePath)

cfn-lint $TemplateFilePath

aws cloudformation deploy \
  --stack-name "$STACK_NAME" \
  --s3-bucket "$BUCKET" \
  --s3-prefix sync \
  --region $REGION \
  --template-file $TemplateFilePath \
  --no-execute-changeset \
  --tags group=cruddur-sync \
  --parameter-overrides $PARAMETERS \
  --capabilities CAPABILITY_NAMED_IAM
```

Perform `bundle install` or `bundle update --bundler` before proceeding with the stack deployment using `./bin/cfn/sync`.

Update the role-to-assume in the GitHub Action YAML file with the ARN (Amazon Resource Name) of this role.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject"
            ],
            "Resource": [
                "arn:aws:s3:::annleefores.cloud/*",
                "arn:aws:s3:::annleefores.cloud"
            ]
        }
    ]
}
```

### Reconnect Database and Post Confirmation Lambda

#### Reconnect DB

- Configure the DB URL and update the security group (SG) for the new RDS DB.
- Perform a schema load on the RDS.
- Execute the following command to perform migrations on the production DB:

```
CONNECTION_URL=$PROD_CONNECTION_URL ./bin/db/migrate
```

#### Fix CloudFront distribution for SPA

Update the Distribution resource in the frontend `template.yaml` file to include an error page:

```bash
CustomErrorResponses:
	- ErrorCode: 403
	  ResponseCode: 200
	  ResponsePagePath: /index.html
```

#### Update Post Confirmation Lambda

- Update Connection URL ENV VAR of post confirmation lambda to use the new DB Connection URL
- Update VPC for lambda to use the VPC created for cruddur
    - Choose Public Subnets
    - Go to EC2 Security Group and create a new security group with outbound all rule
    - Go to `CrdDbRdsSG` and add a new inbound rule for PSQL, set source to Post Confirmation lambda SG
    - Update the lambda VPC SG with this new CognitoPostConf SG
    - Wait for the update to finish
- Login and try posting a crud

### Use CORS for Service

Update the service template backend and frontend URLs in `config.toml` to use the exact values with `https://` instead of `*`. Use parameters to specify these values.

Ensure to update the deploy script to include the necessary parameters.

## Homework Challenges

### GitHub Actions Frontend Sync

Ensure that the CrdSync role CloudFormation (CFN) is deleted. We are not utilizing it in this CI/CD pipeline because the Access credentials returned do not function properly with the sync tool.

Create the `.github/workflows/sync.yml` file.

```yaml
name: Sync-Prod-Frontend

on:
  workflow_dispatch:
  push:
    branches:
      - prod
    paths:
      - "frontend-react-js/**"
  pull_request:
    branches:
      - prod
    paths:
      - "frontend-react-js/**"

jobs:
  build_and_deploy:
    name: Statically build and deploy
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./frontend-react-js/
    steps:
      - name: checkout branch
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: "npm"
          cache-dependency-path: ./frontend-react-js/package-lock.json
      - name: Install deps
        run: npm ci
      - name: Build
        run: npm run build --if-present
        env:
          CI: false
          REACT_APP_BACKEND_URL: ${{ secrets.REACT_APP_BACKEND_URL }}
          REACT_APP_FRONTEND_URL: ${{ secrets.REACT_APP_FRONTEND_URL }}
          REACT_APP_AWS_PROJECT_REGION: ${{ secrets.REGION }}
          REACT_APP_AWS_COGNITO_REGION: ${{ secrets.REGION }}
          REACT_APP_AWS_USER_POOLS_ID: ${{ secrets.REACT_APP_AWS_USER_POOLS_ID }}
          REACT_APP_CLIENT_ID: ${{ secrets.REACT_APP_CLIENT_ID }}
          REACT_APP_API_GATEWAY_ENDPOINT_URL: ${{ secrets.REACT_APP_API_GATEWAY_ENDPOINT_URL }}

      - name: Set up Ruby
        uses: ruby/setup-ruby@v1.150.0
        with:
          ruby-version: "3.0"
          bundler-cache: true
      - name: Install dependencies & Run Sync
        run: |
          cd ..
          export SYNC_BUILD_DIR="$(pwd)/${{ vars.SYNC_BUILD_DIR }}"
          export SYNC_OUTPUT_CHANGESET_PATH="$(pwd)/${{ vars.SYNC_OUTPUT_CHANGESET_PATH }}"
          bundle install
          bundle exec rake sync
        env:
          AWS_REGION: ${{ secrets.REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SYNC_S3_BUCKET: ${{ vars.SYNC_S3_BUCKET }}
          SYNC_CLOUDFRONT_DISTRUBTION_ID: ${{ vars.SYNC_CLOUDFRONT_DISTRUBTION_ID }}
          SYNC_AUTO_APPROVE: ${{ vars.SYNC_AUTO_APPROVE }}
```

The `working-directory: ./frontend-react-js` directive is used to set the default path for all run commands.

Please note that this configuration will only impact the `run` steps in your job. If you are utilizing third-party actions, you may need to separately set the working directory for those actions by passing the appropriate input parameter. For instance, if you are using the `actions/checkout@v2` action, you can set the working directory as shown below:

```yaml
steps:
- uses: actions/checkout@v3
- uses: actions/setup-node@v3
  with:
    node-version: 18
    working-directory: frontend-react-js
- run: npm ci
- run: npm test
```

Add environment variables for the frontend build to the repository variables:

```
REACT_APP_BACKEND_URL: 
REACT_APP_FRONTEND_URL: 
REACT_APP_AWS_PROJECT_REGION: 
REACT_APP_AWS_COGNITO_REGION: 
REACT_APP_AWS_USER_POOLS_ID: 
REACT_APP_CLIENT_ID: 
REACT_APP_API_GATEWAY_ENDPOINT_URL: 
```

Add an environment variable for sync:

```
SYNC_S3_BUCKET= <root_bucket_name>
SYNC_CLOUDFRONT_DISTRUBTION_ID= <cloudfront_distribution>
SYNC_BUILD_DIR= frontend-react-js/build
SYNC_OUTPUT_CHANGESET_PATH= tmp/sync-changeset.json
SYNC_AUTO_APPROVE= true
```

To push a file to S3, you need to add the following permissions to the `machine_user` CloudFormation (CFN):

```yaml
S3FullAccessPolicy: 
    Type: 'AWS::IAM::Policy'
    Properties: 
      PolicyName: 'S3_Machine_User_AccessPolicy'
      PolicyDocument:
        Version: '2012-10-17'
        Statement: 
          - Effect: Allow
            Action: 
              - s3:PutObject
              - s3:GetObject
              - s3:ListBucket
              - s3:DeleteObject
            Resource:
              - arn:aws:s3:::annleefores.cloud/*
              - arn:aws:s3:::annleefores.cloud
      Users:
        - !Ref CruddurMachineUser
```

For invalidating CloudFront, add the following permission to the `machine_user` CloudFormation (CFN) and deploy:

```yaml
CloudFrontAccessPolicy: 
    Type: 'AWS::IAM::Policy'
    Properties: 
      PolicyName: 'Cloudfront_Machine_User_AccessPolicy'
      PolicyDocument:
        Version: '2012-10-17'
        Statement: 
          - Effect: Allow
            Action: 
              - cloudfront:CreateInvalidation
            Resource:
              - !Sub arn:aws:cloudfront::${AWS::AccountId}:distribution/${DistributionId}
      Users:
        - !Ref CruddurMachineUser
```

Save the `machine_user` access credentials to GitHub repository secrets. These credentials will be used to configure services via GitHub Actions.

### Cruddur Frontend 2.0 - NextJS, Tailwind, Typescript