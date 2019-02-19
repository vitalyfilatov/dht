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
});

app.get('/', function (req, res) {
  sqlquery = "SELECT * FROM (SELECT id, temp, hum FROM dht ORDER BY id DESC LIMIT 10) AS `table` ORDER BY id ASC;"
  con.query(sqlquery, function (err, result, fields) {
    if (err) throw err;
    chartdata = {"xid": [], "temp": [], "hum": []};
    result.forEach(function(x) {
      chartdata.xid.push(x.id);
      chartdata.temp.push(x.temp);
      chartdata.hum.push(x.hum);
    });
  });
  res.render('dht', {dht: chartdata});
})

app.listen(3000, function () {
})
