// Custom hooks
import React, { useState, useEffect, useMemo, memo, useCallback } from "react";

// custom hooks must start with "use"
function useTodos(){
  const [todos,setTodos] = useState([]);
  useEffect(()=>{
    fetch("http://localhost:3000/todos/").then(
      async function(res){
        let ans = await res.json();
        console.log(ans);
        setTodos(ans);
      }
    )
  },[]); 
  return todos;
}

function App() {
  const todos = useTodos();
}

export default App;
