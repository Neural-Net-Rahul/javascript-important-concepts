// Wrapper
// Create four boxes having border 3px soild red and background color pink and padding a little
// Inside first box : hello world
// Second box : box of blue color
// Third box : Hi there how are you
// Fourth box : an image

import React from "react"

function App(){
    return (
        <>
        <Wrapper>
            hello world
        </Wrapper>
        <Wrapper>
            <div style={{background:"blue", height:"4px"}}/>
        </Wrapper>
        <Wrapper>
            Hi there how are you
        </Wrapper>
        <Wrapper>
            <img src="zerodha-logo.png"/>
        </Wrapper>
        </>
    )
}

function Wrapper({children}){
    return (
        <div style={{border:"2px solid red", padding:"3px", background:"pink", margin:"8px"}}>
            {children}
        </div>
    )
}

export default App;
