### To build, package and deploy this project follow this steps

1. Build SAM project

```
sam build 
```

2. Create a S3 bucket. Only to do the first time you package this project
```
aws s3api create-bucket --bucket <name of bucket> 
```

3. Package project

```
sam package --template-file <name of the template> --s3-bucket <name of the bucket you just created> --output-template-file <name of the output template file>
```

4. Deploy project to cloudformation

Run this if there is no nested applications

```
sam deploy --region <your region> --template-file  <name of the output template file> --stack-name <name of your stack> --capabilities CAPABILITY_IAM
````

## To clean up the application from your account

````
aws cloudformation delete-stack <name of your stack> --region <your region>
aws s3 rb s3://<name of the bucket you just created> --region <your region>
````