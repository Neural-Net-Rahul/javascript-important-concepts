// We will create a simple react TODO application with in-memory database
import React, {useState} from "react";

function App(){
  const [todos,setTodos] = useState([]);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [isEditing,editingState] = useState(false);
  const [currentEditionId,currentEditingState] = useState(null);

  function addTodo(){
    if(!isEditing){
      setTodos([...todos,{
        id : Date.now(), title, description, completed : false
      }]);
    }
    else{
      setTodos(todos.map(todo => ((todo.id===currentEditionId)? {...todo,title,description} : todo)))
      editingState(false);
      currentEditingState(null);
    }
    setTitle('');
    setDescription('');
  }

  function editTodo(id){
    const obj = todos.find(todo => todo.id===id);
    editingState(true);
    setTitle(obj.title);
    setDescription(obj.description);
    currentEditingState(id);
  }

  function removeTodo(id){
    setTodos(todos.filter(todo => todo.id!==id));
  }

  function strikeThroughContent(id){
    setTodos(todos.map(todo => ((todo.id===id)?{...todo,completed:!todo.completed} : todo)))
  }

  return(
    <>
      <h1>TODO Application</h1>
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Add Title"/> <br />
      <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Add description"/><br/>
      <button onClick={addTodo}>{(!isEditing)?"Add TODO" : "Update TODO"}</button><br />
      <h4>List of Tasks</h4>
      {todos.map(todo => 
        <div style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
          <b>Title :</b> {todo.title} <br /><b>Description :</b> {todo.description} <br /><button onClick={()=> editTodo(todo.id)}>Edit</button><button onClick={() => removeTodo(todo.id)}>Remove</button><input type="checkbox" checked={todo.completed} onClick={()=>strikeThroughContent(todo.id)}/><br /><br /></div>
      )}
    </>
  )
}

export default App;
