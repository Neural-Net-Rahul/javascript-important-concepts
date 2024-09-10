// Recipe App using React
// Add, Edit, View, Delete, Favourite
// User has to write title of recipe and description of recipe, and then click on Add Recipe. This will add recipe. 
// There will be a dropdown which contains two options "all","favourites", when "all" is selected, it will show all recipe, along side there will be buttons for edit, view description, delete, mark as favourite or defavourite it. Same when "favourites" was selected.

import React, {useState} from "react"

function Recipe(props){
  let id = props.id;
  let title = props.title;
  let description = props.description;
  let favourite = props.favourite;
  let viewDescription = props.viewDescription;
  return(
    <>
    <p><b>Title : </b>{title}</p> 
    {
      (viewDescription===true)? <p style={{marginTop:"-16px"}}><b>Description : </b>{description}</p> : ""
    }
    <p style={{marginTop:"-16px"}}><button onClick={() => {props.toggleViewDescription(id)}}>{(viewDescription===true)?"Hide":"View"}</button><button onClick={()=>props.editRecipe(id)}>Edit</button><button onClick={() => props.deleteRecipe(id)}>Delete</button><button onClick={() => props.toggleFavourite(id)}>{(favourite===false)?"Favourite":"Unfavourite"}</button></p>
    </>
  )
}

function App(){
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [recipe,setRecipe] = useState([]);
  const [editing,setEditing] = useState(false);
  const [updatingId,setUpdatingId] = useState(null);
  const [filter,setFilter] = useState('all');

  function addUpdateRecipe(){
    if(title!="" && description!=""){
      if(editing){
        setRecipe(recipe.map(ithrecipe=>((ithrecipe.id===updatingId)?{...ithrecipe,title,description}:ithrecipe)))
        setEditing(false);
        setUpdatingId(null);
      }
      else{
        setRecipe([...recipe,{ id:Date.now(), title, description, favourite : false, viewDescription:false}]);
      }
      setTitle('');
      setDescription('');
    }
  }

  function deleteRecipe(id){
    setRecipe(recipe.filter(ithrecipe => ithrecipe.id!==id));
  }

  function editRecipe(id){
    setEditing(true);
    for(let i = 0;i<recipe.length;i++){
      if(recipe[i].id===id){
        setTitle(recipe[i].title);
        setDescription(recipe[i].description);
      }
    }
    setUpdatingId(id);
  }
  
  function toggleViewDescription(id){
    setRecipe(recipe.map(ithrecipe => (ithrecipe.id===id)?{...ithrecipe,viewDescription:!ithrecipe.viewDescription}:ithrecipe))
  }

  function toggleFavourite(id){
    setRecipe(recipe.map(ithrecipe => (ithrecipe.id===id)?{...ithrecipe,favourite:!ithrecipe.favourite}:ithrecipe))
  }

  return(
    <>
      <input type="text" placeholder="Add title of Recipe..." value={title} onChange={(e)=>setTitle(e.target.value)}/> <br />
      <input type="text" placeholder="Add description" value={description} onChange={(e)=>setDescription(e.target.value)}/> <br />
      <button onClick={addUpdateRecipe}>{(editing!==true)?"Add Recipe":"Update Recipe"}</button><br/><br/>
      <select value={filter} onChange={(e)=>setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="favourites">Favourites</option>
      </select>
      {
        recipe
          .filter(ithrecipe => (filter==='all') || (filter==='favourites' && ithrecipe.favourite===true))
          .map(ithrecipe => <Recipe id={ithrecipe.id} title={ithrecipe.title} description={ithrecipe.description} favourite={ithrecipe.favourite} deleteRecipe={deleteRecipe} editRecipe={editRecipe} viewDescription={ithrecipe.viewDescription} toggleViewDescription={toggleViewDescription} toggleFavourite={toggleFavourite}></Recipe>
        )
      }
    </>
  )
}

export default App;
