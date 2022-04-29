import { render } from '@testing-library/react';
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

   useEffect(() => {
    setData((val) => [...val, cmessage]);
   }, [cmessage]);

   function reciveingUser(){
    socket.on("sendUser", (user) => {
        console.log(user);
        setUsersConntected(user);
    });
   }

   function reciveingMessage(){
    socket.on('message',  (message) => {
      setcMessage(message[0]);
    });
   }

  function handleSubmit(e) {
    e.preventDefault(); 
      socket.emit("sendMessage", inputVal);
    
  }

    return(
        <div className='chatview'>
            <div className='chat-screen'>
                {data.map((val) => (
                    <p>{val.quotes}</p>
                ))}
                
            </div>

        <form >
            <div className='form-container'>
                <div className="input-container">
                    <input 
                       
                        onChange={(evt) => { setInputVal(evt.target.value) }}
                        type="text"
                        name='quotes' 
                        placeholder="type your message...">
                    </input>
                
                </div>
                <div className='button-container'>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Submit</button>
                   
                </div>
            </div>
        </form>
            
           
        </div>
    );
    
}

export default ChatView;