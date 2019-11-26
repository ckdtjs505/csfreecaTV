const express = require("express");
const app = express();

const PORT = 4000;

function handleListening (){
    console.log('Listening on')
}

app.listen(PORT,handleListening );