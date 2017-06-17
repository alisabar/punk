
const http = require('http'),
      express = require('express'),

      data = require("./json/targil1.json"),
      app = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
 
console.log("port is "+port);

http.createServer(app).listen(port);

console.log("server is running");
var Mongo=require('./mongoose_connect');
var mongodb=new Mongo();
app.post('/register',
    (req,res)=>{
      db.newUser(res,req.body.name,req.body.password);
     
    });
