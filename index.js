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
    .catch(() => {
        res.status(500).json({error: "The users information could not be retrieved."})
    })
})

server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    // alt way const { id } = req.params
    
    db.findById(id)
    .then( user => {
        user ? 
        res.json(user) : 
        res.status(404).json({message: "The user with the specified ID does not exist."});
    })
    .catch(() => {
        res.status(500).json({message: "The user information could not be retrieved."});
    })
})

server.post("/api/users", (req, res) => {
    const userBody = req.body;

    db.insert(userBody)
    .then( user => {
        if (user) {
            res.status(201).json(user);
         }
        else {
            res.status(400).json({errorMessage: "Please provide name and bio for the user."});
            }
        }).catch(() => {
            res.status(500).json({ error: "There was an error while saving the user to the database"})
        })
    })

server.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const {name, bio} = req.body;

    if (!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        return;
    }

    db.update(id, {name, bio})
    .then (user => {
       if (user) {
            res.sendStatus(200).json(user)
       } 
    //    else if (id === 0) {
    //        res.status(400).json({errorMessage: "No users with this id exists.. "})
    //    }
    }).catch(() => {
        resizeTo.status(500).json({error: "The user information could not be modified"})
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