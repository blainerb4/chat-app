//no import statements cos we are in node
const express = require('express');
const socketio = require('socket.io'); //has methods this is the backend, frontend is socket.io-client
//io is an instance of socketio-need to declare instance of io
const cors = require ('cors');
//built in node module http
const http = require('http');


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

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

//changing
//const io = socketio(server);
const io = socketio (server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true
    }
});


//corsOptions={
//    cors: true,
//    origins:["http://localhost:3000"],
 //  }

//call router as a middleware
app.use(router);


//io.on (built in keyword connection) will run when we have a client connection on our io instance
//socket.on we have a built in disconnect when a user disconnects from our io instance
//used to register client joining and leaving application
//call back function, inside bracket socket going to be connected as a client side socket
//all code will be in this connection, socket.on wont have parameters because user just left
io.on('connection', (socket) => {
//    console.log('we have a new connection');

    //we can specifiy the event 'join', callback function (something that will happen on join)
    //we can trigger some reponse immediately after the socket on event emited and request it 
    //using callback, we can do error handling
    /*
        socket.on('join', ({ name, room }, callback) => {
        console.log(name, room);
        const error = true;
        if(error) {
            callback({ error: 'error' });
        }
    });
    */
    socket.on('join', ({ name, room }, callback) => {
//        console.log(name, room);
        //adduser function can only return object with error and user property
        //id is a specific instance of socket
        const { error, user } = addUser({ id: socket.id, name, room });

        //we are using callback function and error message is dynamically coming
        //based on spefific error, thus if there is an existing user with that username
        //we will out error as username is taken, if error we will get kicked out of function
        //because there is return statement in users.js function
        if(error) return callback(error);

        //when user in room we can handle message event and messages
        //system messages when someone joins(admin messages)
        //specify payload of this event
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        //sends message to everyone besdies specific user, send to specgic room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined`});
        //if no errors we will call built in socket.join(joins a user in a room)
        //name of room stored in user.room and we get it out of user
        socket.join(user.room);

        //find out what users are in the room
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        //callback at the frontend gets called everytime if no error we wont pass error
        callback();
    });

    //admin generated message is message, user generated message is sendMessage
    //we emitted event from the backend to the front end but here we are expecting event
    //on the backend so we'll wait to send message...after we write we will transfer to front end
    //to emit message, callback going to run after event is emitted
    //inside event we take in data(message, callback) get user that sends that message thru id
    //we have id of specigic user
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        //message coming from front end
        io.to(user.room).emit('message', { user: user.name, text: message });
        //when user leaves send message to room data, we need new state of users in the room
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        //do something after message sent on the frontend
        callback();
    });
    
    socket.on('disconnect', () => {
 //       console.log('user has left.');
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`})
        }
    })
});



server.listen(PORT, () => console.log(`server has started on port ${PORT}`));

//app.listen-usually use this
//we can see what data we are getting and we can actually write emitters and listeners
//for the client side 