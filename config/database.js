require('dotenv').config()
const mongoose=require('mongoose')

const configureDB=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connecting to db')
    })
    .catch((err)=>{
        console.log(err)
    })

   // 
   
}
module.exports=configureDB