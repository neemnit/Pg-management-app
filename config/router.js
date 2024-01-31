const express=require('express')
const router=express.Router()
const userController=require('../app/controller/userController')
const buildingControler=require('../app/controller/buildingsController')
const roomControler=require('../app/controller/roomController')
const tenantControler=require('../app/controller/tenantController')
router.post('/api/building',buildingControler.create)
router.get('/',userController.get)
router.post('/api/user/register',userController.create)
router.get('/api/user/register',userController.show)
router.delete('/api/user/:id',userController.destroy)
router.get('/api/user/register/:id',userController.showById)
router.get('/api/building',buildingControler.list)
router.put('/api/building/:id',buildingControler.update)
router.delete('/api/building/:id',buildingControler.destroy)
router.post('/api/room',roomControler.create)
router.get('/api/room',roomControler.list)
router.put('/api/room/:id',roomControler.update)
router.delete('/api/room/:id',roomControler.destroy)
router.post('/api/tenant',tenantControler.create)
router.get('/api/tenant',tenantControler.list)
router.put('/api/tenant/:id',tenantControler.update)
router.delete('/api/tenant/:id',tenantControler.destroy)
router.get('/api/tenant/:id',tenantControler.show)
module.exports=router