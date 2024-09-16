const fs = require('fs')
const path = require('path')
const express = require('express')

const db = require('./db/db.json');

const app = express()

//Tutor said public folder may be blocked, this will unblock it
app.use(express.static('public'));
//Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//routes to API - used GET
app.get('/api/notes', (req, res) => {
    console.log("Hit Notes Route...")
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("data: ", data);
        let dataDb = JSON.parse(data);
        res.json(dataDb)
    });
});


//using POST
app.post('/api/notes', (req, res) => {
    const newNote = req.body
    newNote.id = uuidv4()
    const dataArr = JSON.parse(db) 
    dataArr.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(dataArr))
    res.json(dataArr)
});

//Delete
app.delete('/api/notes/:id', (req, res) => {
    const newDb = db.filter((note) => 
    note.id !== req.params.id)
    fs.writeFileSync('./db/db.json', JSON.stringify(newDb))
    readFile.json(newDb)
});

const PORT = process.env.PORT || 3000


// routes (html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))  //
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () => console.log(`App is listening on PORT ${PORT}`)); 