import React from 'react';
import './Input.css';
//message, set message, send message were undefined so we haave to
// so we need to pss them properties in chat.js and destructure them as props
const Input = ({ message, setMessage, sendMessage }) => (
    <form className='form'>
        <input 
        className='input'
        type='text'
        placeholder='type a message...'
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className='sendButton' onClick={event => sendMessage(event)}>Send</button>
    </form>
)

export default Input;