const Room=require('../models/room')
const roomCltr={}
roomCltr.create=(req,res)=>{
    const body=req.body
    const room=new Room(body)
    room.save()
    .then((room)=>{
        res.json(room)
    })
    .catch((err)=>{
        res.json(err)
    })
}
roomCltr.list=(req,res)=>{
    Room.find()
    .then((room)=>{
        res.json(room)
    })
    .catch((err)=>{
        res.json(err)
    })
}
roomCltr.update=(req,res)=>{
    const body=req.body
    const id=req.params.id
    Room.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((room)=>{
        res.json(room)
    })
    .catch((err)=>{
        res.json(err)
    })
}
roomCltr.destroy=(req,res)=>{
    const id=req.params.id
    Room.findByIdAndDelete(id)
    .then((room)=>{
        res.json(room)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports=roomCltr