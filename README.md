# github-lambda-redis

Follow [instructions](https://aws.amazon.com/blogs/compute/dynamic-github-actions-with-aws-lambda/)
to configure GitHub, an SNS topic, and a Lambda function.

Additional configuration for the Lambda function:
* Set runtime to Node.js 6 or higher.
* Set timeout to 1 second.
* Configure VPC (it will be needed to access Redis behind ElastiCache).

Use the following IAM role:
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DeleteNetworkInterface"
            ],
            "Resource": "*"
        }
    ]
}
```

Install Node.js modules:
```
npm install
```
Set Redis host in `config.js`.

Build and upload the Lambda function:
```
./update.sh <lambda_function_name>
```