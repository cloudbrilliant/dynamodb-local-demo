# Local dynamodb Development

[Setting up locally](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

start local dynamodb instance

```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```


create table on local

```bash
aws dynamodb create-table --cli-input-json file://create-table.json --endpoint-url http://localhost:8000:
```

create table on aws

```bash
aws dynamodb create-table --cli-input-json file://create-table-movies.json --region us-west-2
```

list tables on local

```bash
aws dynamodb list-tables --endpoint-url http://localhost:8000
```
