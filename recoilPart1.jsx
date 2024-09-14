// Understanding recoil and will implement a small incrementCounter and decrementCounter App
import React from "react"
import { countAtom, isEvenSelector } from "./store/atoms/count"
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil"

function App(){
  return(
    <>
      <RecoilRoot>
        <Count/>
      </RecoilRoot>
    </>
  )
}

function Count(){
  return(
    <>
      <CountRenderer/>
      <Buttons/>
    </>
  )
}

function CountRenderer(){
  const count = useRecoilValue(countAtom);
  const isEven = useRecoilValue(isEvenSelector);
  return(
    <>
    <div>{count}</div>
    {
      (isEven)?<div>It is even</div> : <div>It is odd</div>
    }
    </>
  )
}

function Buttons(){
  const setCount = useSetRecoilState(countAtom);
  return(
    <>
      <button onClick={() => setCount(c => c+1)}>Increment</button>
      <button onClick={() => setCount(c => c-1)}>Decrement</button>
    </>
  )
}

export default App;

/*
folder store -> folder atom -> file count.jsx

import {atom, selector} from 'recoil'
export const countAtom = atom({
    key : "countAtom",
    default : 0
})

export const isEvenSelector = selector({
    key : "isEvenSelector",
    get : ({get}) => {
        const ans = get(countAtom);
        return ans%2==0;
    }
})
*/
