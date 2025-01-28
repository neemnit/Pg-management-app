const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const Schema=mongoose.Schema
const roomSchema=new Schema({
    roomName:{
        type:String,
        required:[true,"name is required"],
        unique:true,
        uniqueCaseInsensitive: true

    },
    roomType:{
        type:String,
        required:[true,"Please select Room type"],
        default:'non-ac'
        
    },
    numberSharedRoom:{
       type:String,
       required:[true,"Please selecte room"]
    },

    buildingId:{
        type:Schema.Types.ObjectId,
        ref:'Building',
        required:true  
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:false
    }
})
roomSchema.plugin(uniqueValidator,{
    message:'Error, expected {PATH} to be unique.'
})
const Room=mongoose.model('Room',roomSchema)

module.exports=Room