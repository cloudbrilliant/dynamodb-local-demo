const AWS = require('aws-sdk');

AWS.config.update({
    region: 'eu-west-2',
    endpoint: 'http://localhost:8000',
});

let docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: 'MusicCollection2',
    Item: { Artist: 'Dua Lipa', SongTitle: 'I dont know' },
};

docClient.put(params, function (err, data) {
    if (err) {
        console.error('Unable to putitem:' + JSON.stringify(err, null, 2));
    } else {
        console.log('putitem succeeded' + data);
    }
});
