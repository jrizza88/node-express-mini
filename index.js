// implement your API here
const express = require('express');

const db = require("./data/db.js");

const server = express();

const PORT = 7777;

server.use(express.json());

server.get("/", (req, res) => {
    res.send("Initial get request");
});

server.get("/api/users", (req, res) => {
    db.find()
    .then(users => {
        res.json(users);
    })
    .catch(({code, message}) =>{
        res.status(code).json({err: message})
    })
})

//1. when setting up server, it will need to invoke the methods
// from the db.js files 

// 2. then you need a promise (use .then and .catch)

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})