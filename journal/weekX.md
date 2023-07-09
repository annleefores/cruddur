# Week X — Final

## Required Homework

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

### Cruddur Frontend 2.0  - NextJS, Tailwind, Typescript