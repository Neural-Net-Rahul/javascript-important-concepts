// fetch vs axios
const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

// YOU CAN USE GET, POST, PUT AND DELETE REQUESTS HERE

// https://httpdump.app/inspect/2cbd63d5-16df-4f0f-957d-f3ce73e42205 => use this to test other requests

async function main(){
    // fetch("http://localhost:3000/todos/").then(
    //     async function(resolvedValue){
    //         const ans = await resolvedValue.json();
    //         console.log(ans);
    //     }
    // )

    // const response = await fetch("http://localhost:3000/todos")
    // const final_res = await response.json()
    // console.log(final_res);

    const response = await axios.get("http://localhost:3000/todos");
    console.log(response.data);
}

main();
