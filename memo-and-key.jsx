// key, memo
// key : when you are traversing an array for ex {todos.map(todo => <TextComponent title={todo.title}/>)}, it is good to add key, for example {todos.map(todo => <TextComponent key={todo.id} title={todo.title}/>)} even though we are not using it, and try to have a unique id for every array element
// memo
import React, {useState, memo} from "react"
function App(){
    const [name,setName] = useState("Rahul");
    return (
        <>
            <button onClick={() => setName(Math.random())}>Click to change name</button>
            <PrintName title={name}/>
            <PrintNewName/>
            <PrintNewName/>
            <PrintNewName/>
        </>
    )
}

function PrintName(props){
    return (
        <p>My name is {props.title}</p>
    )
}

const PrintNewName = memo(function PrintNewName(){ // this thing will not render again and again
    console.log("entered")
    return (
        <p>My name is King Rahul.</p>
    )
})

export default App;
