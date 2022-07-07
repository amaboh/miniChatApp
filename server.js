
const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const server = http.createServer(app)

const io = socketio(server);
// set static folder

app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket =>{
    socket.emit("message", "welcome to ChatCord")

    // Broadcast when a user connects
    socket.broadcast.emit("message", "A user has joined the chat");

    // Runs when a client disconnects
    socket.on("disconnect", ()=>{
        io.emit("message", "A client has left the chat")
    });
} )

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));