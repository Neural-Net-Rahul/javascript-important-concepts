const express = require("express")
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://rahul769311:3UTQR5jInE5YMAbD@cluster0.7uvnr.mongodb.net/user_app") // /nameofdb

const User = mongoose.model('users', { // name of table
    name : String,
    email : String,
    password : String
});

app.post("/signup", async function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({email : username});
    if(existingUser){
        res.json({
            "msg" : "User already exists. Use different email"
        })
    }
    const user = new User({
        name : name,
        email : username,
        password : password   
    });
    user.save();
    res.json({
        "msg ": "User saved successfully!!"
    })
})

app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
})
