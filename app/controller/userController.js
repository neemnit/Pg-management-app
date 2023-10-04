const User=require('../models/user')
const userCltr={}
userCltr.create=(req,res)=>{
const body=req.body
const user=new User(body)
user.save()
.then((user)=>{
    res.json(user)
})
.catch((err)=>{
    res.json(err)
})
}
userCltr.show=(req,res)=>{
    
    User.find()
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        res.json(err)
    })
}
userCltr.showById=(req,res)=>{
    const id=req.params.id
    User.findById(id)
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        res.json(err)
    })
}
userCltr.destroy=(req,res)=>{
    const id=req.params.id
    User.findByIdAndDelete(id)
    .then((user)=>{
        res.json(user)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports=userCltr