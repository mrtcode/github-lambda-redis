# github-lambda-redis

Use instruction to setup a new Lambda function:
https://aws.amazon.com/blogs/compute/dynamic-github-actions-with-aws-lambda/

Set timeout to 1 second.
Configure VPC, because it will be needed to access Redis behind ElastiCache.

Set Redis host in `config.js`.

```
./update.sh <lambda_function_name>
```