const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

const FILE_PATH = "todos.json";

function loadData(){
    try{
        const data = fs.readFileSync(FILE_PATH,"utf-8");
        return JSON.parse(data);
    }
    catch(err){
        return [];
    }
}

function saveData(){
    fs.writeFileSync(FILE_PATH,JSON.stringify(db,null,2));
}

let db = loadData(); 

// GET : Get all todos
// http://localhost:3000/todos
app.get("/todos",function(req,res){
    res.status(200).json(db);
})

// GET : Get specific todo, defined by its id
// http://localhost:3000/todos/:id
app.get("/todos/:id",function(req,res){
    const id = req.params.id;
    let arr = db.filter((i)=>{
        if(i.id == id){
            return true;
        }
        return false;
    })
    if(arr.length==0){
        return res.status(404).message("404 : Not found!")
    }
    res.status(200).json(arr);
})

// Post : Post a new todo
// http://localhost:3000/todos
app.post("/todos",function(req,res){
    const todo = req.body;
    let id = db.length;
    id++;
    todo.id = id;
    db.push(todo);
    saveData();
    res.status(200).send("Posted successfully!");
})

// Put : Update an exisiting todo by its id
// http://localhost:3000/todos/:id
app.put("/todos/:id",function(req,res){
    const id = parseInt(req.params.id);
    const index = id-1;
    if(id<1 || id>db.length){
        res.status(404).send("Not found");
    }
    db[index] = {...db[index],...req.body};
    saveData();
    res.status(200).json("Updated successfully!");
})

// Delete : Delete using a specific id
// http://localhost:3000/todos/:id
app.delete("/todos/:id",function(req,res){
    const id = req.params.id;
    db = db.filter((i)=>{
        if(i.id==id){
            return false;
        }
        return true;
    })
    let k = 1;
    for(let i = 0;i<db.length;i++){
        db[i].id = k;
        k++;
    }
    saveData();
    res.status(200).json("Deleted sucessfully");
})

app.listen(3000,function(req,res){
    console.log("Server is running on port : ",3000);
})
