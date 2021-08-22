const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);

AWS.config.update({
    region: 'eu-west-2',
    endpoint: 'http://localhost:8000',
});

let docClient = new AWS.DynamoDB.DocumentClient();

app.get('/', function (req, res) {
    res.send({ title: 'API Entry Point' });
});

app.get('/songs', function (req, res) {
    let params = {
        TableName: 'MusicCollection2',
        ProjectionExpression: '#Artist,#SongTitle',
        ExpressionAttributeNames: {
            '#Artist': 'Artist',
            '#SongTitle': 'SongTitle',
        },
    };

    console.log('Scanning Music Collection.');
    docClient.scan(params, onScan);

    function onScan(err, data) {
        if (err) {
            console.error(
                'Unable to scan the table. Error JSON:',
                JSON.stringify(err, null, 2)
            );
        } else {
            res.send(data);
            // print all the music songs
            console.log('Scan succeeded.');
            data.Items.forEach(function (music) {
                console.log(music.Artist, music.SongTitle);
            });
            if (typeof data.LastEvaluatedKey != 'undefined') {
                console.log('Scanning for more...');
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                docClient.scan(params, onScan);
            }
        }
    }
});
