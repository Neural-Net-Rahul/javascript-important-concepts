// useRef
import React , {useEffect, useRef} from 'react'

function App(){
  const reff = useRef();
  useEffect(()=>{
    setTimeout(()=>{
      reff.current.innerHTML = "Hi Rahul how are you?";
    },5000)
  },[]);
  return(
    <div ref={reff}>Hi there!!</div>
  )
}

export default App;
