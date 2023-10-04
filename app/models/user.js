const mongoose=require('mongoose')
const isEmail=require('validator/lib/isEmail')
const Schema=mongoose.Schema
const userSchema=new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return "invalid email format"
            }

        }
    }
})
const User=mongoose.model('User',userSchema)
module.exports=User