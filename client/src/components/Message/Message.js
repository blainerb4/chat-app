import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

//what will message look like, create logic
//message is an object that has both user and text
const Message = ({message : {user, text}, name}) => {
    let isSentByCurrentUser = false;

    //we need to trim our name on back and frontend 
    const trimmedName = name.trim().toLowerCase();

    //check whether user is equal to trimmed name
    //if true we need to render message that is blue and on the right side(sent by cureent user)
    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
        ? (
            //messages sent by current user
            <div className='messageContainer justifyEnd'>
                <p className='sentText pr-10'>{trimmedName}</p>
                <div className='messageBox backgroundBlue'>
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            //messages not sent by current user, dispaly of name of the person is diff
            <div className='messageContainer justifyStart'>
                <div className='messageBox backgroundLight'>
                    <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
                </div>
                <p className='sentText pl-10'>{user}</p> 
            </div>
        )
    )
}
//padding right(pr) padding left(pl) of 10 (-10)
//we do not need trimmedname because we have username of current user in user
export default Message;