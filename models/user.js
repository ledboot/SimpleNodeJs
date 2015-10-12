var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var UserSchema =new Schema({
	nick_name:{type:String},
	pass:{type:String},
	email:{type:String},
	avatar:{type:String},
	create_at:{type:Date,default:Date.now},
	update_at:{type:Date,default:Date.now},
	accessToken:{type:String},
});

UserSchema.plugin(BaseModel);
UserSchema.index({email:1},{unique:true});
UserSchema.index({nick_name:1},{unique:true});

mongoose.model('User',UserSchema);