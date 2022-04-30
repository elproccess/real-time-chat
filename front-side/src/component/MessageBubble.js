import React from 'react'
import './MessageBubble.css'

function MessageBubble({message, user}){

    return(
        <div className="bubble">
            <p>{user}</p>
            <hr class="dashed"></hr>
            <p>{message}</p>
            
        </div>
    );
}


    export default MessageBubble;