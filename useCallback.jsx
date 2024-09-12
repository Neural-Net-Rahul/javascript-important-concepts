import React, { useState, useEffect, useMemo, memo, useCallback } from "react";
// useCallback => because of this function does not gets recreated
function App() {
  const [count,setCount] = useState(0);
  const a = useCallback(function a(){
    return "Hi";
  },[])
  return(
    <>
      <ButtonComponent title={a}/>
      <button onClick={()=> setCount(count+1)}>{count}</button>
    </>
  )
}

const ButtonComponent = memo(function ButtonComponent({title}){
  console.log("Enter");
  console.log(title());
  return (
    <div>Hi there</div>
  )
})

export default App;
