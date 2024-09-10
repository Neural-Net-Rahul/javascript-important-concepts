// Creating an HTTP Server

const express = require("express");
const app = express();
const port = 3000;
app.use(express.json()); // middleware

// database
let db = [
    {
        name : "Rahul",
        age : 20,
        gender : "Male",
        admirer : ["Bill Gates","Narendra Modi","Selena Gomez"]
    },
    {
        name : "Selena Gomez",
        age : 23,
        gender : "Female",
        admirer : ["Joe Biden","Barack Obama"]
    },
    {
        name : "Bill Gates",
        age : 50,
        gender : "Male",
        admirer : ["Rahul","Narendra Modi"]
    },
    {
        name : "Donald Trump",
        age : 70,
        gender : "Male",
        admirer : ["Jensen Huang","Narendra Modi"]
    }
]

// GET : When you give the name of a person, it will return you the details of admirer
// http://localhost:3000/socialmedia/?name=Rahul => it's like a query
// http://localhost:3000/socialmedia/?name=Selena%20Gomez
// http://localhost:3000/socialmedia/?name=Selena%20Gomez&name=Rahul
app.get("/socialmedia",function(req,res){
    const name = req.query.name; // if multiple names are there in query, then name variable would be an array
    const index = db.findIndex(person => person.name.toLowerCase() === name.toLowerCase());
    if(index==-1){
        return res.status(404).json(`message : ${name} is not found`);
    }
    const admirerPeople = db[index].admirer;
    let arr = [];
    for(let i = 0;i<db.length;i++){
        const admirerName = db[i].name;
        for(let j = 0;j<admirerPeople.length;j++){
            if(admirerName == admirerPeople[j]){
                arr.push(db[i]);
            }
        }
    }
    res.json(arr);
});

// POST : You can add details of any person
// http://localhost:3000/socialmedia/
/*
{
    "name" : "Narendra Modi",
    "age" :67,
    "gender" : "Male",
    "admirer" : ["Rahul","Valimir Putin"]
}
*/
app.post("/socialmedia",function(req,res){
    const person = req.body;
    db.push(person);
    res.status(200).send("Person Added!");
})

// PUT : You can update details of any person, based on it's name (considering name to be unique)
// http://localhost:3000/socialmedia/?name=Rahul
app.put("/socialmedia",function(req,res){
    const name = req.query.name;
    const index = db.findIndex(person => person.name.toLowerCase() === name.toLowerCase());
    if(index==-1){
        return res.send("Name not found!");
    }
    db[index] = req.body;
    res.send("Update done!");
})

// DELETE : Delete data of some particular user
// http://localhost:3000/socialmedia/?name=Rahul
app.delete("/socialmedia",function(req,res){
    const name = req.query.name;
    const index = db.findIndex(person => person.name.toLowerCase() === name.toLowerCase());
    if(index==-1){
        return res.status(404).send("User not found!");
    }
    for(let i = index+1;i<db.length;i++){
        db[i-1] = db[i];
    }
    db.pop();
    res.status(200).send("Done!")
})

app.listen(port,function(req,res){
    console.log("Server is running on port : ",port);
})
