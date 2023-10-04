const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')
const Schema=mongoose.Schema
const roomSchema=new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        unique:true,
        uniqueCaseInsensitive: true

    },
    buildingId:{
        type:Schema.Types.ObjectId,
        ref:'Building',
        required:true  
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
roomSchema.plugin(uniqueValidator,{
    message:'Error, expected {PATH} to be unique.'
})
const Room=mongoose.model('Room',roomSchema)

module.exports=Room