const {Schema,model}=require('mongoose');


const otpSchema=Schema({
    number:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createAt:{
        type:Date,
        default:Date.now(),
        index:{expires:10000}
    }
    //After 5 min otp experise automatically
},{Timestamps:true})

module.exports=model('Otp',otpSchema);