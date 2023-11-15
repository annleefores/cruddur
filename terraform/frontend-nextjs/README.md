# nextjs13-lambda

This repository provides a quick and easy way to deploy a simple Next.js app router application on AWS Lambda using [aws-lambda-web-adapter](https://github.com/awslabs/aws-lambda-web-adapter).

## Usage

Before you start, ensure that you have the following prerequisites installed:

- [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [add your AWS credentials](https://docs.aws.amazon.com/cli/latest/reference/configure/index.html)

### Configuring Next.js App

In your Next.js app, update the `next.config.js` file to build the application for standalone deployment by adding `output: 'standalone'`. Additionally, include the `assetPrefix` property to specify the CDN DOMAIN for serving static files:

```jsx
const nextConfig = {
    output: 'standalone',
    assetPrefix: 'https://<CDN_DOMAIN>',
    // other code
}
```

### Build and deploy

#### Clone repo and build script
- Clone this repository
```sh
https://github.com/annleefores/nextjs13-lambda.git
cd nextjs13-lambda
```
- Navigate to the deploy script
```sh
cd packages/deploy
```
- Install dependencies
```sh
npm i
```
- Build deploy script
```sh
npm run build
```
- To run deploy script in dev mode
```sh
npm run dev
```

#### Add env variable to tfvars
- Create `terraform.tfvars` file based on the `terraform.tfvars.example` example file
- Follow the comments to add required values
- `terraform.tfvars` must be present in tf folder for the script to work
#### Using external Next.js app

- Build and deploy application
```sh
cd path/to/my/nextjs/app
node path/to/nextjs13-lambda/packages/deploy/build/deploy.js deploy
```

- Delete deployment
```sh
cd path/to/nextjs-app
node path/to/nextjs13-lambda/packages/deploy/build/deploy.js delete
```

- Building application
```sh
cd path/to/my/nextjs/app
node path/to/nextjs13-lambda/packages/deploy/build/deploy.js build
```

#### Using the example Next.js app

```sh
cd examples # from root directory
node ../packages/deploy/build/deploy.js <command>
```


---

For more details and a comprehensive guide, refer this article: [Run Next.js 13 App on Lambda with AWS Lambda Web Adapter](https://annleefores.com/blog/run-nextjs-on-lambda).
