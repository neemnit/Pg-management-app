// const mongoose=require('mongoose')
// require('dotenv/config')
// const url=process.env.URL;

// const configureDB=()=>{
    
//     mongoose.connect("mongodb+srv://user1:node@cluster0.xrowujb.mongodb.net/?retryWrites=true&w=majority,",
//     {
//         UseNewUrlParser:true,
//         useUnifiedTopology:true
//     })
//     .then((req)=>{
        
//         console.log(req.url)
//         console.log('success')
//     })
// }
// module.exports=configureDB
// To connect with your mongoDB database
// const mongoose = require("mongoose");
// // Connecting to database
// mongoose.connect(
// "mongodb://localhost:27017/",
// {
// 	dbName: "yourDB-name",
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// },
// (err) =>
// 	err ? console.log(err) : console.log(
// 	"Connected to yourDB-name database")
// );
// const express = require("express");
// const app = express();
// const cors = require("cors");
// console.log("App listen at port 5000");

const mongoose=require('mongoose')

const configureDB=()=>{
    mongoose.connect('mongodb+srv://nitu:nitu@cluster0.xrowujb.mongodb.net/pgapp?retryWrites=true&w=majority',{family:4})
    .then(()=>{
        console.log('connecting to db')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=configureDB