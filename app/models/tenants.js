const mongoose=require('mongoose')
const isEmail=require('validator/lib/isEmail')
const isNumeric=require('validator/lib/isNumeric')
const Schema=mongoose.Schema
const tenantSchema=new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    
        aadhar:{
            type:String,
            required:[true,"adhar is required"],
            unique:true,
            maxlength:16
        },
        email:{
            type:String,
            required:[true,"email is requrired"]
        ,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return "invalid email format"
            }
        }},
        roomId:{
            type:Schema.Types.ObjectId,
            ref:'Room',
            required:true
            
        },
        buildingId:{
            type:Schema.Types.ObjectId,
            ref:'Building',
            required:true
        },
        mobile:{
            type:String,
            required:[true,"mobile number is required"],
            unique:true,
            maxlength:10,
            minlength:10,
            validate:{
                validator:function(value){
                    return isNumeric(value)
                },
                message:function(){
                    return "invalid mobile number"
                }
            }
        }
})
const Tenant=mongoose.model('Tenant',tenantSchema)
module.exports=Tenant