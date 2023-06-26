#!/bin/bash

# Variables
BUILD_DIR=${PWD}

ARTIFACTS_DIR="artifacts"

# Functions

install() {
  npm ci
}

build() {
  npm run build
}

sync_static() {
    # sync static files to S3 + Cloudfront
    cp -r .next/static/. .next/standalone/.next/static
}

artifacts() {
  # Copy artifacts for deployment
  cp -r public/. .next/standalone/public

  cp -r .next/standalone/. $ARTIFACTS_DIR

  cp run.sh $ARTIFACTS_DIR
}

# Call functions
install
build
# sync_static
artifacts