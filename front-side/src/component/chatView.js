import React,{useState, useEffect}from 'react';

import socket from '../global';
import './chatView.css';

function ChatView({chat}){
    const[data, setData] = useState([]);
    const[inputVal, setInputVal] = useState("");
    const[cmessage, setcMessage] = useState([]);
    const[usersConntected, setUsersConntected] = useState([]);

    useEffect(() => {
        socket.on('history', (messages) => setData(messages) );
       reciveingMessage();
       }, []);


       return(
        <div className='chatview'>
            <div className='chat-screen'>
            </div>

        <form >
            <div className='form-container'>
                <div className="input-container">
              
                
                </div>
            </div>
        </form>
            
           
        </div>
    );

}