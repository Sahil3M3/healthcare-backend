const express=require("express");

const app=express();

app.use("/api",(req,res)=>{
res.send("Hello Boss")
})

app.listen(5000,()=>{
    console.log("Server is Servering");
    
})