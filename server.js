var mysql = require('mysql');
var chart = require("chart.js");
const express = require('express')
const app = express()
app.set('view engine', 'ejs')

var con = mysql.createConnection({
  host: "localhost",
  user: "dht",
  password: "dht",
  database: "dht"
});

chartdata = {"xid": [], "temp": [], "hum": []};

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT id, temp, hum FROM dht where id between 416 and 490", function (err, result, fields) {
    if (err) throw err;
    global.result = result;
    result.forEach(function(x) {
      chartdata.xid.push(x.id);
      chartdata.temp.push(x.temp);
      chartdata.hum.push(x.hum);
    });
  });
});

app.get('/', function (req, res) {
  res.render('dht', {dht: chartdata, error: null});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// https://stackoverflow.com/questions/32092676/using-chart-js-inside-node-js
