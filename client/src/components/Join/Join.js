import React, { useState } from 'react';
//links to our /chat path
import { Link } from 'react-router-dom';
import './Join.css';
//front end connection
//when user joins a connection request is going to be fired, when user leaves a disconnection
//event will be fired up
//react hooks for function based components(once dummy components)
//hooks we can use state and lifecycle methods inside of them, we can convert class based
//components to function based components
//usestate-hook for using state inside function based components 
const Join = () => {
    //we declare hooks in function based component here
    //first parameter variable, second is a setter function
    //use name state, function to set name state and we are passing an empty string
    //as an intial value of name state
    const [name, setName] = useState(''); //pass intiial value the varialble will have(empty string)
    const [room, setRoom] = useState('');
    //now to create presentation -- margin top 20
    //onchange-when user type something an event will occur, we will get data from this event 
    //using event.target.value(holds our data)
    //name input, we will set output of the input into name variable
    //simple variable names as state properties using hooks
    //we wont be transferring data through props or redux we will be using query strings
    // we will pass data as a url
    return (
        <div className='joinOuterContainer'>
            <div className='joinInnerContainer'>
                <h1 className='heading'>Join</h1>
                <div>
                    <input 
                    placeholder='Name' 
                    className='joinInput' 
                    type='text' 
                    onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input 
                    placeholder='Room' 
                    className='joinInput mt-20' 
                    type='text' 
                    onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link 
                onClick={
                    event => (!name || !room) ? event.preventDefault() : null} 
                to={`/chat?name=${name}&room=${room}`}
                >
                <button className='button mt-20' type='submit'>Sign In</button>
                </Link>
            </div>
        </div>
    )
}
//we will be able to read the name and room variable from our chat component to see the data
//we need to prevent user from clicking button or link if he hasnt specified the name or the room
//that would break our app--we use onclck and call back function event
//if room and name specified we want to be transferred
export default Join
