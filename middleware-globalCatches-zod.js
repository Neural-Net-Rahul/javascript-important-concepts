// Learning Middlewares, global catches, zod

const express = require("express");
const zod = require("zod");
const app = express();
app.use(express.json()); // middleware

/*
Suppose you write, 
app.get("/todos", func1, func2, func3, function(req,res){
    // something
})
above, middleware is actually func1
execution order : func1 -> func2 -> func3 -> function(req,res)
*/

// userMiddleware will be called  twice

app.use(userMiddleware)
function userMiddleware(req,res,next){
    let userName = "rahul"; // req.header.userName
    let password = "pass"; // req.header.password
    if(userName=="rahul" && password=="pass"){
        console.log("Entered into userMiddleware");
        next();
    }
    else{
        res.send("Your input is wrong!!");
    }
}

const userSchema = zod.object({
    name : zod.string(),
    age : zod.number(),
    email : zod.string().email(),
    password : zod.number().min(4)
})

/*
{
    "name":"Rahul",
    "age":20,
    "email":"rahul769311@gmail.com",
    "password":123764
}

*/

function validateInput(req,res,next){
    // whether the input sended by the user in req.body is correct or not
    // we will use zod for that
    const validation = userSchema.safeParse(req.body);
    console.log(validation.success);
    next();
}

app.get("/todos",userMiddleware, (req,res,next)=>{
    console.log("Entered into second middleware");
    next();
},userMiddleware,function(req,res){
    // throw new Error("Something went wrong!");
    res.send("Task done!");
})

app.post("/todos",validateInput,(req,res)=>{
    res.send("Post successfully!");
})

// GLOBAL CATCHES
// if any error occurs, below function will automatically catch it and execute it
app.use(function(err,req,res,next){
    console.log(err);
    res.send("Error occurred");
})

app.listen(3000,function(req,res){
    console.log("Server is running on port : 3000")
})
