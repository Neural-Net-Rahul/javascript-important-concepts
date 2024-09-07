// Authentication : JSON Web Tokens (JWT)
// Takes json as input (this json contains your details) at the time of singup and convert it into a string which contains 3 sections : this string is token : this string is JWT
// Even to encode details (except userPassword) into string we neet JWT Password, this is the same password used at the time of verification.
// from string we can get back the JSON data 
// from this string + orgnization password (which organization knows) one can verify the account.

// It is like, first time when you sign in with email and password, it will generate a token for you, and next time when you search for any query then it will pass this token and orgnanization has password, they will verify you and then send you back the response. When you sign out, token vanishes.

// This token is crucial, if someone gets it, can use your account. If you send this token to someone and someone will use it then chatgpt will think you are using it and your credits will decline.

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();

app.use(express.json());

const ALL_USERS = [
    {
        username : "rahul769311@gmail.com",
        password : "12345",
        name : "Rahul"
    },
    {
        username : "rahul@gmail.com",
        password : "123456",
        name : "Rahul NN"
    },
    {
        username : "rahul11@gmail.com",
        password : "1234567",
        name : "Rahul NNa"
    }
];

function userExists(username,password){
    let ans = false;
    ALL_USERS.forEach((obj)=>{
        if(obj.username === username && obj.password === password){
            ans = true;
        }
    });
    return ans;
}

app.post("/signin",function(req,res){
    // an existing user is trying to sign in
    const username = req.body.username;
    const password = req.body.password;
    if(userExists(username,password)){
        // as user is doing sign in, it means we again have to generate a token for him
        let token = jwt.sign({username : username},jwtPassword);
        return res.json({
            token
        });
    }
    else{
        res.status(401).send("User does not exist. SignUp first!!");
    }
})

app.get("/users",function(req,res){
    const token = req.headers.authorization;
    const decoded = jwt.verify(token,jwtPassword);
    const username = decoded.username;
    let arr = [];
    for(let i = 0;i<ALL_USERS.length;i++){
        if(ALL_USERS[i].username!=username){
            arr.push(ALL_USERS[i]);
        }
    }
    res.json(arr);
})

app.use(function(err,req,res,next){
    res.send("Error occurred : " + err);
})

app.listen(3000,function(req,res){
    console.log("Server is running on port 3000");
})
