var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var UserSchema =new Schema({
	loginname:{type:String},
	nickname:{type:String},
	pass:{type:String},
	email:{type:String},
	avatar:{type:String},
	create_at:{type:Date,default:Date.now},
	update_at:{type:Date,default:Date.now},
	active:{type:Boolean,default:false},
	signaturn:{type:String},
	accessToken:{type:String},
});

UserSchema.plugin(BaseModel);
UserSchema.index({email:1},{unique:true});
UserSchema.index({nick_name:1},{unique:true});

mongoose.model('User',UserSchema);