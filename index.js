require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const configureDB=require('./config/database')
const router=require('./config/router')
const port=4000||process.env.PORT
//setup db
configureDB()
app.use(express.json())

app.use(cors())

app.use(router)

app.listen(port,()=>{
    console.log('server running on port',port)
})