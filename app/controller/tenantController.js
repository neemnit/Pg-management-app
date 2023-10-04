const Tenant=require('../models/tenants')
const tenantCltr={}
tenantCltr.create=(req,res)=>{
    const body=req.body
    const tenant=new Tenant(body)
    tenant.save()
    .then((tenant)=>{
        res.json(tenant)
    })
    .catch((err)=>{
        res.json(err)
    })
}
tenantCltr.list=(req,res)=>{
    Tenant.find()
    .then((tenant)=>{
        res.json(tenant)
    })
    .catch((err)=>{
        res.json(err)
    })
}
tenantCltr.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Tenant.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((tenant)=>{
        res.json(tenant)
    })
    .catch((err)=>{
        res.json(err)
    })
}
tenantCltr.destroy=(req,res)=>{
    const id=req.params.id
    Tenant.findByIdAndDelete(id)
    .then((tenant)=>{
        res.json(tenant)
    })
    .catch((err)=>{
        res.json(err)
    })
}
tenantCltr.show=(req,res)=>{
    const id=req.params.id
    Tenant.findById(id)
    .then((tenant)=>{
        res.json(tenant)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports=tenantCltr