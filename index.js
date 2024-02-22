require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./src/routes/routes'); 

const app = express();

app.use(express.json());
app.use(routes);

let port = process.env.PORT || 3000;

// Connect 
const  db_url = process.env.DB_URL;
async function start(){
    try {
        await mongoose.connect(db_url);
        app.listen(port, () =>{
            console.log('App running in port '+ port)
        });
    } catch(e){
        console.log('failed to connect to db', e)
    }
}
start();