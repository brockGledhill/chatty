var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  };

var messages = [];

app.use(bodyParser.json());

app.options('/', function(req, res, next){
  res
    .status(200)
    .set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
    .send(JSON.stringify(messages));
});

app.get('/', function(req, res){
  res
    .status(200)
    .set(headers)
    .send(JSON.stringify(messages));
});

app.post('/', function(req, res){

  messages.push({
    username: req.body.username,
    message: req.body.message,
    time: new Date()
  });

  res
    .status(200)
    .set(headers)
    .send(JSON.stringify(messages));
});

app.listen(8000, function(){
  console.log('I pity 8000 fools');
});
