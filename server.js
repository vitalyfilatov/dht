var mysql = require('mysql');
var chart = require("chart.js");
const express = require('express')

const app = express()
app.set('view engine', 'ejs')
app.use("/public", express.static(__dirname + "/public"));

var con = mysql.createConnection({
  host: "localhost",
  user: "dht",
  password: "dht",
  database: "dht"
});

chartdata = {"xid": [], "temp": [], "hum": []};
instant = {"temp": 0, "hum": 0};

con.connect(function(err) {
  if (err) throw err;
});

app.get('/', function (req, res) {
  sqlquery = "SELECT * FROM (SELECT id, temp, hum FROM dht ORDER BY id DESC LIMIT 101) AS `table` ORDER BY id ASC;"
  con.query(sqlquery, function (err, result, fields) {
    if (err) throw err;
    chartdata = {"xid": [], "temp": [], "hum": []};
    result.forEach(function(x) {
      chartdata.xid.push(x.id);
      chartdata.temp.push(x.temp);
      chartdata.hum.push(x.hum);
    });
  });
  sqlquery = "SELECT temp, hum FROM dht ORDER BY id DESC LIMIT 1;"
  con.query(sqlquery, function (err, result, fields) {
    if (err) throw err;
    instant.temp = result[0].temp;
    instant.hum= result[0].hum;
    // console.log("Instant = ", instant.temp, instant.hum);
  });
  res.render('dht', {dht: chartdata, instant: instant});
})

app.listen(3000, function () {
})
