# GitMax

[![Logo](https://cloud.githubusercontent.com/assets/9557418/21736215/e0419284-d423-11e6-9720-df7750631c69.png)](http://www.gitmax.cn)

An app to help GitHub users to gain reputation. 

### Contents
It helps you to add friends according to your minimum requirement of:

1. The number of followers he/she has.
2. The number of stars he/she has obtained.
3. Todo: Adding support for social apps so that you can add your social app friends on GitHub.

![image](https://cloud.githubusercontent.com/assets/9557418/21736200/c8689824-d423-11e6-9660-e12f9a8306f9.png)

### Architecture
The app is architected with cost-efficiency and scalability in mind. 
It is completely serverless using AWS Lambda functions. It is also hosted in AWS S3 with cloudfront CDN for the high 
accessibility across the world. 

FrontEnd: 
* [React](https://facebook.github.io/react/)
* [ant.d framework](https://ant.design/) 

Backend:
* [AWS Lambda](https://aws.amazon.com/lambda/) 
* [Serverless framework](https://serverless.com/)
* [DynamoDB](https://aws.amazon.com/dynamodb/?nc2=h_m1)

