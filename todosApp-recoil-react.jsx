// Understanding recoil and will implement a small incrementCounter and decrementCounter App
import React from "react"
import { titleBox, descBox, filteringValue, todos, filteredtodos } from "./store/atoms/count";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

function App(){
  return(
    <>
    <RecoilRoot>
      <InputBoxTitle/><br />
      <InputBoxDesc/><br />
      <AddTodoButton/><br />
      <ShowFilteringValue/><br />
      <ShowFilteredTodos/>
    </RecoilRoot>
    </>
  )
}

function InputBoxTitle(){
  const [title,setTitle] = useRecoilState(titleBox);
  return(
    <>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter title here..."/>
    </>
  )
}

function InputBoxDesc(){
  const [desc,setDesc] = useRecoilState(descBox);
  return(
    <>
      <input type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Enter description here..."/>
    </>
  )
}

function AddTodoButton(){
  const [title,setTitle] = useRecoilState(titleBox);
  const [desc,setDesc] = useRecoilState(descBox);
  const [todo,setTodo] = useRecoilState(todos);
  return(
    <>
    <button onClick={() => {
      setTodo([...todo,{id:Math.random(),title,desc}])
      setTitle('')
      setDesc('')
    }}>Add Todo</button>
    </>
  )
}

function ShowFilteringValue(){
  const [value,setValue] = useRecoilState(filteringValue);
  return(
    <>
      <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Enter filtering criteria here..."/>
    </>
  )
}

function ShowFilteredTodos(){
  const todo = useRecoilValue(filteredtodos);
  return(
    <>
        {todo.map(ithtodo => <div key={ithtodo.id}><li><div>{ithtodo.title}</div><div>{ithtodo.desc}</div></li><br /></div>)}
    </>
  )
}

export default App;

/*
store -> atoms -> count.jsx
count.jsx

import {atom, selector} from 'recoil'

export const titleBox = atom({
    key : "titleBox",
    default : ''
})

export const descBox = atom({
    key : "descBox",
    default : ''
})

export const filteringValue = atom({
    key : "filteringValue",
    default : ''
})

export const todos = atom({
    key : "todos",
    default : []
})

export const filteredtodos = selector({
    key : "filteredtodos",
    get : ({get}) => {
        const filtTodos = get(todos);
        const filtValue = get(filteringValue);
        return filtTodos.filter(ithtodo => ithtodo.title.includes(filtValue) || ithtodo.desc.includes(filtValue))
    }
})
*/
