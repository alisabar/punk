// const mongoose = require('mongoose'),
//       consts=require('./consts.js');
// mongoose.Promise=global.Promise;
// mongoose.connect(consts.MLAB_KEY);
// var userSchema= require('./schema_user.js');
// const conn= mongoose.connection;
// var newUser1;
  
//         conn.on('error',
//             (err) => {
//                 console.log(`connection error: ${err}`);
//             });
     
//         conn.once('open',
//             ()=>{
//             userSchema.find({name:name1, password:pass},
//             (err, user)=>{
               
//                 if(err){
//                     console.log(`query error:${err}`);
                  
//                   console.log('mongoose.disconnect...');
//                     mongoose.disconnect();
//                    return res.status(500).json({status:false, message:"Find error."});
//                 }
//                 if(!user){
//                      newUser1=new userSchema({
//                         name:name1,
//                         password:pass,
//                         videos:[]
//                     });
//                    newUser1.save(
//                     (err) =>{
//                         if(err){
//                             console.log(`err: ${err}`);
//                             console.log('mongoose.disconnect...');
//                             mongoose.disconnect();
//                            return res.status(500).json({status:false, message:"Save error."});
//                         }
//                         else{
//                             console.log(`Saved document: ${JSON.stringify(newUser)}`);
//                             res.json({status:true, name:name1, pass:pass, newUser:newUser1});
//                         }
                    
//                     });
//                 }
//                 else{
//                      console.log(`Saved document?: ${JSON.stringify(newUser)}`);
//                 }
//             });
           
               
           
