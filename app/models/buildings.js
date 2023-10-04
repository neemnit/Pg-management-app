const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const Schema=mongoose.Schema
const buildingSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:[true,"name is required"],
        unique:true,
        trim:true,
        uniqueCaseInsensitive: true
    },
    address:{
        type:String,
        required:[true,"address is required"]
    },
    landMark:{
        type:String,
        required:[true,"landmark is required"]

        }
    })
    buildingSchema.plugin(uniqueValidator, {
        message: `Error, expected {PATH} to be unique.`
      });
      
    const Building=mongoose.model('Building',buildingSchema)
    module.exports=Building