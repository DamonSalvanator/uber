const dotenv=require("dotenv")
dotenv.config();
const express=require("express");
const app=express();
const cors=require("cors");

app.use(cors());

app.get('/',(req,res)=>{
    res.send("working")
})


module.exports=app