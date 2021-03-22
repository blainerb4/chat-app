import React, { useState, useEffect } from 'react';
//help us with retreiving data from the url
import queryString from 'query-string';
import io from 'socket.io-client';

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import TextContainer from '../TextContainer/TextContainer'
import './Chat.css';

let socket;//define variable

//use state and useeffect life cycle method inside of hooks-useeffect does the same thing as
//componentdidmount and componentdidupdate-no more duplicate code
//useeffect calls-useeffect allows us to use lifecylce method(sideeffects) in function components
//arrow function then we do something on componentdidmount(on the first render) then on
//componentdidupdate so on every other render, we can also specfify componnentdidunmount by doing return function cleanup
//we can initiate request for connection and disconnection of socket.io instance
//inside here the most important socket.io logic will be stored
const Chat = ({ location }) => {
    const [name, setName] = useState(''); //pass intiial value the varialble will have(empty string)
    const [room, setRoom] = useState('');
    //then spcifiy state for set message and message which is an empty string
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState('') 
    //kep track of messages using state, inside messages we will have an array that stores all messages
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';
    //going to run when the component renders
    //in our chat component we need to retrieve data that users have entered while joining
    //so we fetch it from querystring.parse...location is from react-router-dom we get a url back
    useEffect(() => {
        const { name, room } = queryString.parse(location.search);
        //set connection and pas endpoint to server (localhost5000)
        //changing
        //socket = io(ENDPOINT);
        socket = io(ENDPOINT , {transports: ['websocket', 'polling', 'flashsocket']});
        
        //we can emit different events using this specfic instance of a socket
        setName(name);
        setRoom(room);

        //we need to pass in a string the backend will recognize
        //on join we will pass an object with our name and room, //es6-names are equal we dont have to do name: name
        //we can access call back in index.js on server side as a third parameter to our emit function
        //arrow function will be executed when call back in index.js is called
        //good way to error handle or calling call backs after specific event has emited
        /*
         socket.emit('join', { name, room }, ({ error }) => {
            alert(error);
        }); 
    }, [ENDPOINT, location.search]);
    //before
            socket.emit('join', { name, room }); 
    }, [ENDPOINT, location.search]);
        */
       //return statement is used for unmounting, we need to emit a disconnect event
       //on backend (index.js we had disconnect event on socket.on). happens on unmounting of 
       //components when we leave the chat
        socket.emit('join', { name, room }, () => {
            
        }); 
        return () => {
            socket.emit('disconnect');

            socket.off(); //turns instance of client socket off
        }
    }, [ENDPOINT, location.search]);
    //we need to specify when our useeffect is beign called , we pass an array 
    //only if these two values change we need to re-render our useEffect
    //no more unnecessary sideffects happening with useeffet

    //for handling messages
    //from socket.emit('message' sending payload of user and text) from the backend
    //with array to store messages
    
    useEffect(() => {
        socket.on('message', (message) => {
            //push messages to message array
            //we cant mutate state so we spread all other messages and add one message on it
            
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({ users }) => {
            setUsers(users);
        });

        //we want run use effect wheneber messages array changes
    }, [messages]);

    //function for sending messages
    const sendMessage = (event) => {

        //prevents full browser refersh when key pressed/button clicked
        event.preventDefault();

        //emit listenter in server listens for send message event and sends it to the room
        //second param message, then callback (we will clean our message so when we set message
        //equal to an empty string our input field clears)
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);

    //if key press is not equal to enter we dont do anything so null
    return (
        <div className='outerContainer'>
            <div className='container'>
            <InfoBar room={room}/>
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            {/*<input 
            value={message} 
            onChange = {(event) => setMessage(event.target.value)}
            onKeyPress = {event => event.key === 'Enter' ? sendMessage(event) : null}
            />*/}
            </div>
            {/*display the number of people that are online in one room-loop through them*/}
            <TextContainer users={users} />
        </div>
    )
}

export default Chat
