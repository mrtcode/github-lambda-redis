#!/usr/bin/env bash

rm build/lambda.zip
zip -r build/lambda.zip index.js config.js node_modules