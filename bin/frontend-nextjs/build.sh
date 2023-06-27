#!/bin/bash

ARTIFACTS_DIR="artifacts"


ABS_FILEPATH="$ABS_PATH/frontend-nextjs/"
DIR=$(realpath --relative-base="$PWD" "$ABS_FILEPATH")


cd $DIR

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