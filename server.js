const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'hippos'
let db = ''

// Connecting to server
MongoClient.connect(url, { useUnifiedTopology: true } ,(err, client) => {
    if(err){console.log('error'); return;}
    console.log('connected to mongo')
    db = client.db(dbName)
})

// #######################
// #######################

app.post("/posts", (req, res) => {
    var ObjectId = require('mongodb').ObjectId; 
    let userId = "5eb3d6b5a52abf5360dbb5d9"
    const id = new ObjectId(userId)
    let message = "testing"
    const collection = db.collection('users')
   
    collection.updateOne({_id:id}, {$set: {'posts': message}}, (err, result) => {
        if(err){console.log('could not update'); return;}
        // console.log(result)
        return res.send(result)
    })
  
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
