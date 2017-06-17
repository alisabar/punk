var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect(consts.MLAB_KEY);
var userSchema= require('./schema_users');

module.exports = class ConnectionWithDB {
    constructor(){
        const conn = mongoose.connection;//get default connection
        conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
            });
        console.log('Mongo init');
    }

    newUser(res,name,pass)
    {

        return conn.once('open',
        ()=>{
           userSchema.find({name:name1, password:pass},
            (err, user)=>{
                if(err)console.log(`query error:${err}`);
                if((user)==null)
                {
                    var newUser=new userSchema({
                        name:"name1",
                        password:"pass";
                        videos:[]
                    });
                   newUser.save(
                    (err=>{
                        if(err)
                            console.log(`err: ${err}`);
                        else{
                            console.log(`Saved document: ${JSON.stringify(newUser)}`);
                        }
                        mongoose.disconnect();
                    }));
                }
               
            });
        });
    }