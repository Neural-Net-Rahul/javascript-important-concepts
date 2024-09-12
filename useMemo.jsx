import React, { useState, useEffect, useMemo } from "react";
// useMemo and useEffect are same, just the diff. is useMemo returns a value
function App() {
  let [value,setValue] = useState(0);
  const [content,setContent] = useState(0);
  let final_ans = useMemo(() => {
    let final_value = 0
    for(let i = 0;i<10000000;i++){
      final_value += i;
    }
    return final_value;
  },[value])
  return(
    <>
    <input type="text" placeholder="Enter a number" value={value} onChange={(e)=>setValue(e.target.value)}/>
    <p>Sum is : {final_ans}</p>
    <button onClick={()=>setContent(content+1)}>Counter ({content})</button>
    </>
  )  
}

export default App;
