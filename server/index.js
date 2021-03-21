//no import statements cos we are in node
const express = require('express');
const socketio = require('socket.io'); //has methods this is the backend, frontend is socket.io-client
//built in node module http
const http = require('http');

//we can run on 5000 but later for deployment our server will require a specific port (in process.env.port) 
//so we do 5000
const PORT = process.env.PORT || 5000;

const router = require('./router');

//set up socket.io
//-used for majority of data transfers (real timeinstant messaging, analytics etc)
//anything that is real time we need to use sockets not https because they are slow
//we need to use websockets (socketio is using this) to show messages in real time

const app = express();
//we need to pass in the app we intilaized from express

const server = http.createServer(app);

//io is an instance of socketio-need to declare instance of io
const io = socketio(server);

//io.on (built in keyword connection) will run when we have a client connection on our io instance
//socket.on we have a built in disconnect when a user disconnects from our io instance
//used to register client joining and leaving application
//call back function, inside bracket socket going to be connected as a client side socket
//all code will be in this connection, socket.on wont have parameters because user just left
io.on('connection', (socket) => {
    console.log('we have a new connection');
    
    socket.on('disconnect', () => {
        console.log('user has left.');
    })
});

//call router as a middleware
app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));

//app.listen-usually use this
