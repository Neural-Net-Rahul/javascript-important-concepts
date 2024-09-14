// atomFamily, selectorFamily

import React , {Suspense, useEffect} from "react"
import { atomFamily, useRecoilValue, RecoilRoot, useSetRecoilState, useRecoilState, useRecoilStateLoadable, useRecoilValueLoadable } from "recoil";
import { todoFamily } from "./store/atoms/count";

function App(){
  return(
    <>
      <RecoilRoot>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </RecoilRoot>
    </>
  )
}

function NewComponent({id}){
  const [ithTodo,setState] = useRecoilState(todoFamily(id));
  useEffect(()=>{
    setTimeout(()=>{
      setState({id : id, title:"new todo", description : ithTodo.description})
    },10000)
  },[])
}

function Todo({id}){
  const ithtodo = useRecoilValueLoadable(todoFamily(id)); // useRecoilStateLoadable
  if(ithtodo.state==="loading"){ // hasValue,  hasError
    return(
      <>
        <div>Loading...</div>
      </>
    )
  }
  else if(ithtodo.state==='hasValue'){
    return(
      <>
        <div>{ithtodo.contents.title}</div>
      </>
    )
  }
  else{
    console.log("Error")
    return(
      <>
        <div>Welcome to world of errors...</div>
      </>
    )
  }
}

export default App;

/*
count.jsx

import {atomFamily, atom, selectorFamily} from 'recoil'
import axios from "axios"

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const todoFamily = atomFamily({
    key : "todoFamily",
    default : selectorFamily({
        key : "selectorFamilyTodo",
        get : (id) => async({get}) => {
            await sleep(5000);
            const fdata = await axios(`http://localhost:3000/todos/${id}`)
            const finalData = await fdata.data;
            return finalData;
        }
    })
})

*/
