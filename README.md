# GitMax - http://www.gitmax.cn
An app to help GitHub users to gain reputation. 

This is the core app of GitMax. It helps you to add friends according to your minimum requirement of:

1. The number of followers he/she has.
2. The number of stars he/she has obtained.
3. Todo: Adding support for social apps so that you can add your social app friends on GitHub.

The app is architected with **cost-efficiency** and **high-scalability** in mind. 

It is completely **serverless** using AWS Lambda functions. 

It is hosted in AWS S3 with cloudfront CDN for a great **accessibility** across the world. 

FrontEnd: 
* [React](https://facebook.github.io/react/)
* [ant.d](https://ant.design/) 

Backend:
* [AWS Lambda](https://aws.amazon.com/lambda/) 
* [serverless](https://serverless.com/)
* [DynamoDB](https://aws.amazon.com/dynamodb/?nc2=h_m1)

