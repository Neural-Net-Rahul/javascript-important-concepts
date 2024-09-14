import React, {useState, createContext, useContext} from 'react'

const countContext = createContext(0);
function App(){
  const [count,setCount] = useState(123);
  return (
    <>
      <countContext.Provider value={count}>
        <Count/>
      </countContext.Provider>
    </>
  )
}

function Count(){
  return(
    <>
      <Button1/>
    </>
  )
}

function Button1(){
  return(
    <>
    <Button2/>
    </>
  )
}

function Button2(){
  const count = useContext(countContext);
  return (
    <>
      <div>{count}</div>
    </>
  )
}

export default App;
