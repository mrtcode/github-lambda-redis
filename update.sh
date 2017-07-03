#!/usr/bin/env bash

./build.sh

aws lambda update-function-code \
--function-name $1 \
--zip-file fileb://build/lambda.zip