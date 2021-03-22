import React from 'react';
import './Messages.css';
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message'
//react scroll to button-scrolls all the messages when the height of the messages gets 
//higher than the height of the container
//we need to loop thru all of messages by sending them as a prop in chat.js
//i=index, both name and message coming from props..we need to pass name to defrientiate messages
const Messages = ({messages, name}) => (
    <ScrollToBottom className='messages'>
        {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
    </ScrollToBottom>
)
//we create a message component 
export default Messages;