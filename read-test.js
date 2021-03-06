var AWS = require('aws-sdk');
AWS.config.update({
    region: 'eu-west-2',
    endpoint: 'http://localhost:8000',
});
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: 'MusicCollection2',
    Key: {
        Artist: 'Dua Lipa',
        SongTitle: 'I dont know',
    },
};

docClient.get(params, function (err, data) {
    if (err) {
        console.error(
            'Unable to read item. Error JSON:',
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log('GetItem succeeded:', JSON.stringify(data, null, 2));
    }
});
