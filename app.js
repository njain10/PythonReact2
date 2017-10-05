var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var csv = require( "fast-csv" );
var path = require('path')
var request = require('request');
var mysql = require('mysql');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tiger",
  database: "mydb"
});

app.get('/getManagerName', function(req, res) {
  con.query("select distinct e.empid as ManagerId,e.empName as ManagerName from mydb.employeetable m join mydb.employeetable e on m.MngrId = e.EmpId", function (err, result, fields) {
    if (err) throw err;
      res.send(result);
  });
});

app.post('/addEmployee', function(req, res) {
  var sql = "INSERT INTO employeetable (EmpName, EmpDept, EmpDob, EmpPhnNumber, MngrId) VALUES ('"+req.body.employee.employeeName+"','"+req.body.employee.dept+"','"+req.body.employee.dob+"','"+req.body.employee.phoneNumber+"',"+req.body.employee.managerId+")";
  con.query(sql, function (err, result) {
    console.log(result);
  });
});

app.post('/getEmployee', function(req, res) {
  con.query("select empId,empName, empDept, empdob, empphnnumber from employeetable where MngrId = " + req.body.ManagerId, function (err, result, fields) {
    if (err) throw err;
      res.send(result);
  });
});

app.get('/getAllEmployee', function(req, res) {
  con.query("select empId,empName from employeetable" , function (err, result, fields) {
    if (err) throw err;
      res.send(result);
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile('/public/Pages/view.html', {root: __dirname })
});

//Port on which this application will run
app.listen(1337);
