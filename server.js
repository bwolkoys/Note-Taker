const fs = require('fs')
const path = require('path')
const express = require('express')
// Sequelize model- the uuid package allows me to generate unique identifiers for each note
const { Model, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const db = require('./db/db.json')

const app = express()
//routes to API - used GET
app.get('api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let dataDb = JSON.parse(data);
        res.json(dataDb)
    });
});

//using POST
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()
    db.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
})