import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    setInterval(() => 
    fetch("http://localhost:3000/todos/")
      .then(async (data) => {
        let final_data = await data.json();
        setTodos(final_data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }),5000)
  },[]);
  return (
   <>
    {
        todos.map((todo,index) => <ShowTodos key={index} title={todo.title} desc={todo.description}/>)
    }
   </>
  );
}

function ShowTodos({title, desc}){
    return(  
    <li>
        <p><b>{title}</b></p>
        <p>{desc}</p>
    </li>
    )
}

export default App;



/*
/* main.js */
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const todos = [
  {
    title: "Buy Grocery",
    description: "Buy groceries from nearby store",
  },
  {
    title: "Buy food items",
    description: "Buy maggi, pasta, cheeze cake",
  },
  {
    title: "Complete homework",
    description: "I don't know about the homework",
  },
];

app.get("/todos", function (req, res) {
  res.json(todos);
});

app.listen(3000, function () {
  console.log("Port is running on 3000");
});

*/
