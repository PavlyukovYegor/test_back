var express = require('express');
var bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const connection = mysql.createConnection({
  host: "localhost",
  user: 'john',
  database: 'test_db',
  password: 'pass'
});
// connection.connect();


var data = [{
    username: "Terka",
    mail: "backspaceegor@gmail.com",
    date_answer: "25/03/2017",
    description: "1111 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dolor enim. Sed a rutrum neque. Etiam vestibulum id magna viverra sagittis. Etiam volutpat tempor facilisis. Curabitur feugiat ligula non bibendum faucibus. Vestibulum sed malesuada nulla, a ullamcorper velit. Curabitur ac pretium elit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc consequat risus feugiat, eleifend ligula at, molestie est. Cras tempus neque sed turpis interdum feugiat. Nunc vitae nisl ut lectus condimentum sollicitudin ut eu eros. Praesent et commodo sapien.",
    homepage: "homepage.url",
    img: "/assets/images/coffee.jpg",
    textfile: "NULL",
  }
]




var app = express();

app.use(cors());

// connection.connect();
app.get('/', function(req, res) {
  data.date_answer = Date.now();
  // connection.connect();
  connection.query("INSERT INTO comments SET ?", data, function(err, result){
    if (err) console.log(err);
    // return connection.end();
})
res.sendStatus('200');
})

app.get('/result', function(req, res) {
  connection.query("SELECT * FROM comments", function(err, result){
    if (err) console.log(err);
    // data = result;
    res.send(result);
    // return connection.end();
  })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(3012, function () {
 console.log('API app started');
})

app.post('/datas', function (req, res) {
  console.log(req.body);
  res.send(data[3]);
})

app.get('/data', function(req, res) {
  res.send(data);
})
