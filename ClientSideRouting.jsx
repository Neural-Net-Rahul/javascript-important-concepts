import React, {lazy, Suspense} from 'react'
const Dashboard = lazy(() => import('./Components/Dashboard'))
const Landing = lazy(() => import('./Components/Landing'))
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'

function App(){
  return (
    <>
      <BrowserRouter>
        <Toolbar/>
        <Routes>
          <Route path='/' element={<Suspense fallback={<div>Loading...</div>}><Landing/></Suspense>}/>
          <Route path='/dashboard' element={<Suspense fallback={<div>Loading...</div>}><Dashboard/></Suspense>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function Toolbar(){
  const navigate = useNavigate(); // must be inside BrowserRouter
  return(
    <>
      <button onClick={() => navigate('/')}>Landing</button>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
    </>
  )
}

export default App;

/*
Dashboard.jsx

function Dashboard(){
    return(
        <div>
            Dashboard Page
        </div>
    )
}

export default Dashboard;
*/

/*
Landing.jsx

function Landing(){
    return(
        <div>
            Landing Page
        </div>
    )
}

export default Landing;
*/
