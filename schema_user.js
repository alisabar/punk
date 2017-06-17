
var mongoose = require('mongoose'),
schema = mongoose.Schema;
//video=require('./schema_video.js');

var userSchema = new schema({
    user_name:  {type: String, index: 1, unique: true, required: true},
    password: {type: Number, required: true},
    videos: [String]
    }, {collection: "registered_users" , strict: true});

var User=mongoose.model('User',userSchema);
console.log(`required paths: ${userSchema.requiredPaths()}`);
console.log(`indexes: ${JSON.stringify(userSchema.indexes())}`);
module.exports=User;