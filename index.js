//var Mongo=require('./mongoos_connect.js');
const http = require('http'),
      express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 8080;
      const mongoose = require('mongoose'),
      consts=require('./consts.js');
var cors = require('cors');
app.use(cors());
consle.log('CORS enabled');

mongoose.Promise=global.Promise;
mongoose.connect(consts.MLAB_KEY);
const conn= mongoose.connection;
conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
            });
console.log('waiting to connect...');
        conn.once('open',
            ()=>{
                console.log('db connection open');
                //console.log('closing db connection');
                //mongoose.disconnect();
            });
var userSchema= require('./schema_user.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// var db=require('./mongoose_connect.js');
console.log("port is "+port);

http.createServer(app).listen(port);

console.log("server is running");


function usersProxy(){
    this.register=function(res,userName,password){
        
        console.log("usersProxy register looking for "+userName+" "+password);

        userSchema.find({user_name:userName, password:password},
            (err, user)=>{
                
                console.log("usersProxy register userSchema.find({name:userName, password:password} completed ", {err:err, user:user});
               
                if(err){
                    console.log(`query error:${err}`);          
                   return res.status(500).json({status:false, message:"Find error."});
                }
                
                console.log('user is '+JSON.stringify(user));
                if(user!='undefined' && user!=null &&user.length > 0){
                     console.log(`user exists ${JSON.stringify(user)}`);
                     res.status(301).json({status:false, message:'user exists'});
                     return;                    
                }

             //create user   
                var newUser=new userSchema({
                    user_name:userName,
                    password:password,
                    videos:[]
                });
               newUser.save(
                (err) =>{
                    if(err){
                        console.log(`err: ${err}`);
                        res.status(500).json({status:false, message:"Save error."});
                        return;
                    }
                    
                    console.log(`user created succesfully ${JSON.stringify(newUser)}`);
                    res.status(200).json({status:true, name:userName, password:password, newUser:newUser});                
                
                });
                
            });
    }

    this.login=function(res,userName,password){
        
        console.log("usersProxy register looking for "+userName+" "+password);

        userSchema.find({user_name:userName, password:password},
            (err, user)=>{
                
                console.log("usersProxy register userSchema.find({name:userName, password:password} completed ", {err:err, user:user});
               
                if(err){
                    console.log(`query error:${err}`);          
                   return res.status(500).json({status:false, message:"System error, please try again"});
                }
                
                console.log('user is '+JSON.stringify(user));
                if(user!='undefined' && user!=null &&user.length > 0){
                     console.log(`user exists ${JSON.stringify(user)}`);
                     res.status(200).json({status:true, user:user});
                     return;                    
                }
                else{
                    res.status(404).json({status:false, message:'user not found'});
                }                              
            });
    }

}
var uProxy=new usersProxy();

//var mongodb=new Mongo();
app.post('/register',
    (req,res)=>{
         
         var userName=req.body.name;
         var pass=req.body.password;
         console.log('register enter '+JSON.stringify(req.body));
        
        uProxy.register(res,userName,pass);
    
    });


app.post('/login',
    (req,res)=>{
         
         var userName=req.body.name;
         var pass=req.body.password;
         console.log('login enter '+JSON.stringify(req.body));
        
        uProxy.login(res,userName,pass);
    
    });
