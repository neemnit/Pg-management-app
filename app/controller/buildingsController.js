const Building=require('../models/buildings')
const buildingCltr={}
buildingCltr.create=(req,res)=>{
    const body=req.body
    const building=new Building(body)
    building.save()
    .then((building)=>{
        res.json(building)
    })
    .catch((err)=>[
        res.json(err)
    ])
}
buildingCltr.list=(req,res)=>{
    Building.find()
    .then((building)=>{
        res.json(building)
    })
    .catch((err)=>{
        res.json(err)
    })
}
buildingCltr.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Building.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((building)=>{
        res.json(building)
    })
    .catch((err)=>{
        res.json(err)
    })
}
buildingCltr.destroy=(req,res)=>{
    const id=req.params.id
    Building.findByIdAndDelete(id)
    .then((building)=>{
        res.json(building)
    })
    .catch((err)=>{
    res.json(err)})
}
module.exports=buildingCltr