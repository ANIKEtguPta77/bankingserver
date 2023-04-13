const {Schema,model}=require('mongoose');


const loginSchema=Schema({
    phonenumber:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    transactions:{
        type:Array,
        required:true
    },
    sent:{
        type:Number,
        required:true
    },
    received:{
        type:Number,
        required:true
    },
    linedata:{
        type:Array,
        required:true
    }
    
  
   
},{Timestamps:true})

module.exports=model('Login',loginSchema);