const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
let ObjectId = require('mongodb').ObjectId; 
const url = 'mongodb://localhost:27017'
const dbName = 'hippos'
let db = ''
let usersCollection = ''

const formidable = require('formidable')

// Connecting to server
MongoClient.connect(url, { useUnifiedTopology: true } ,(err, client) => {
    if(err){console.log('error'); return;}
    console.log('connected to mongo')
    db = client.db(dbName)
    usersCollection = db.collection('users')
})


// #######################

app.post("/users", (req, res) => {    
    const form = formidable({mutliples: true})
    form.parse(req, (err, fields, files) => {
        // VALIDATE DATA
        let name = fields.txtName
        let password = fields.txtPassword

        usersCollection.insertOne({ username, password}, function(err, result) {
            if(err){console.log('could not insert'); return;}
            res.status(200).send(`username: ${name}, password: ${password} ${result.insertedId}`)
        }) // end insertOne
    })// end form parsing
})

// #######################

app.post("/posts", (req, res) => {
    
    
    const form = formidable({mutliples: true})
    form.parse(req, (err, fields, files) => {
        
        let userId = "5eb3d6b5a52abf5360dbb5d9"
        const id = new ObjectId(userId)
        let message = fields.txtName
        
       
        usersCollection.findOneAndUpdate({_id:id}, {$push: {'posts': {_id: new ObjectId(), message}}}, (err, result) => {
            if(err){console.log('could not update'); return;}
            // console.log(result)
            return res.json(result.value.posts[result.value.posts.length - 1]._id)
        })


      });

   
  
})

app.get("/users", (req, res) => {
    const collection = db.collection('users')
    collection.find().toArray((err, result) => {
        if(err){console.log('error'); return;}
        // console.log('OK')         
        return  res.send(result)
    })
})

// #######################
app.listen(80, err => {
    if(err){console.log('sPath'); return;}
    console.log('server listening')
})
