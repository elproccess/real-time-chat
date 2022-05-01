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
    console.log(socket.id);

    //connect user to the chat room
    socket.join('chat');

    //array to place all users, for broadcasting.
    let arr = [];

    //get all users connect to the chat room
    const clients = io.sockets.adapter.rooms.get('chat');

    
    for (const clientId of clients ) {
         arr.push(clientId);
     }

     // broadcast the count & users connected.
    io.to('chat').emit("sendUser", arr);
    io.to('chat').emit("sendUser2", socket.id);
    io.to('chat').emit("sendUserCount", io.engine.clientsCount);


    // retreive all messages from the chat room history.
    db.collection("quotes").find({}).toArray(function(err, result) {
        if(err) return console.error(err);
          socket.emit("history", result);
        });


// add message to db and emit to all clients
  socket.on("sendMessage", async (message) => {
  
    console.log(message);
    await db.collection('quotes').insertOne({ "_id": message._id, "quotes": message, "user": socket.id}, function(err, result) {
      db.collection('quotes').find({"_id": result.insertedId}).toArray(function(err, result) {
        if(err){
          console.log(err);
        }
        //broadcast the db entry message result whicih is {id,message,user}.
        io.to('chat').emit('message', result);
        console.log(result);
      });
    });

  });

  // disconnect the user from the room, also broadcast the user disconnected & connetected user count
  socket.on('disconnect', function(){
    console.log(socket.id + " disconnected");
    for (const clientId of clients ) {
       console.log(clientId);
       arr.push(clientId);
   }
   io.to('chat').emit('disconnectedUser', socket.io);
   io.to('chat').emit("sendUserCount", io.engine.clientsCount);
  });


});

server.listen(3002, () => {
    console.log('listening on *:3002');
  });