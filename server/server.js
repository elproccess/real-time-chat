const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: '*' } });

var count = 0;

app.use(bodyParser.urlencoded({ extended: true }))

const connectionString = "mongodb+srv://test:test@cluster0.6fe8i.mongodb.net/star-wars-quotes?retryWrites=true&w=majority"
var db


MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err)
  db = client.db('star-wars-quotes')

  app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on port ${3001}.`);
  });
 
})

io.on('connection', (socket) => {
    
    db.collection("quotes").find({}).toArray(function(err, result) {
        if(err) return console.error(err);
          socket.emit("history", result);
        });


});

server.listen(3002, () => {
    console.log('listening on *:3000');
  });