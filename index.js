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

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    // alt way const { id } = req.params
    
    db.findById(id)
    .then( users => {
        users ? res.json(users) : res.status(400).json({err: "invalid id!"});
    })
    .catch(({code, message}) =>{
        res.status(code).json({err: message})
    })
})

//1. when setting up server, it will need to invoke the methods
// from the db.js files 

// 2. then you need a promise (use .then and .catch)

// in some cases you will need an if else or ternary function 
// to compare a successful request or if a user doesn't do somethign right
// and then you can incorporate the catch!

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})