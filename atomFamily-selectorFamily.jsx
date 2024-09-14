// atomFamily, selectorFamily

import React , {useEffect} from "react"
import { atomFamily, useRecoilValue, RecoilRoot, useSetRecoilState, useRecoilState } from "recoil";
import { todoFamily } from "./store/atoms/count";

function App(){
  return(
    <>
      <RecoilRoot>
        <NewComponent id={1}/>
        <Todo id={1}/>
        <Todo id={2}/>
        <Todo id={2}/>
        <Todo id={2}/>
        <Todo id={2}/>
        <Todo id={2}/>
        <Todo id={2}/>
        <Todo id={1}/>
        <Todo id={1}/>
      </RecoilRoot>
    </>
  )
}

function NewComponent({id}){
  const [ithTodo,setState] = useRecoilState(todoFamily(id));
  useEffect(()=>{
    setTimeout(()=>{
      setState({id : id, title:"new todo", description : ithTodo.description}) // only todos with id = 1 re-renders
    },10000)
  },[])
}

function Todo({id}){
  const ithtodo = useRecoilValue(todoFamily(id));
  return(
    <>
      <div>{ithtodo.title}</div>
    </>
  )
}

export default App;

/*
main.jsx

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const todos = [
  {
    id : 1,
    title: "Buy Grocery",
    description: "Buy groceries from nearby store",
  },
  {
    id : 2,
    title: "Buy food items",
    description: "Buy maggi, pasta, cheeze cake",
  },
  {
    id : 3,
    title: "Complete homework",
    description: "I don't know about the homework",
  },
  {
    id : 4,
    title: "Just Chill",
    description: "Why to chill in life!!",
  },
];

app.get("/todos/:id", function (req, res) {
  const id = req.params.id;
  res.json(todos.find(todo => todo.id===parseInt(id)))
});

app.listen(3000, function () {
  console.log("Port is running on 3000");
});

*/



/*
count.jsx

import {atomFamily, atom, selectorFamily} from 'recoil'
import axios from "axios"

// export const TODOS = [
//     {
//         id : 1,
//         title : "todo1",
//         description : "desc1"
//     },
//     {
//         id : 2,
//         title : "todo2",
//         description : "desc2"
//     },
//     {
//         id : 3,
//         title : "todo3",
//         description : "desc3"
//     }
// ]

// export const todoFamily = atomFamily({
//     key : "todoFamily",
//     default : (id) => {
//         return TODOS.find(todo => todo.id === id)
//     }
// })

export const todoFamily = atomFamily({
    key : "todoFamily",
    default : selectorFamily({
        key : "selectorFamilyTodo",
        get : (id) => async ({get}) => {
            const fdata = await axios(`http://localhost:3000/todos/${id}`)
            const finalData = await fdata.data;
            return finalData;
        }
    })
})

/*
Atom Family  : 

When you pass id as a parameter to todoFamily, it dynamically creates an atom for each id. The atomFamily function in Recoil allows you to generate multiple atoms based on the parameter you pass to it, which in your case is id.

How atomFamily works:
Dynamic atom creation: When you pass a different id to the todoFamily, Recoil will create and manage a separate atom instance for that specific id. This means that every unique id will correspond to a unique atom.
Caching mechanism: If the same id is passed multiple times, Recoil will not create a new atom each time. Instead, it will retrieve the already existing atom for that id. This ensures efficient use of memory and avoids unnecessary atom creation.
Example in your case:
When you do this:

const ithtodo = useRecoilValue(todoFamily(id));
and pass different ids, Recoil will:

Create a unique atom for id = 1, id = 2, etc.
Reuse the atom if the same id is passed again (i.e., if you access todoFamily(1) multiple times, the same atom is used).
So in your app, calling <Todo id={1} /> and <Todo id={2} /> will cause Recoil to create separate atoms for id = 1 and id = 2.

Summary:
Yes, it creates an atom specific to each id.
Each unique id will have its own atom instance, but Recoil will reuse the atom if you pass the same id multiple times.
*/
