import React,{useState, useEffect, useRef}from 'react';

import socket from '../global';
import './chatView.css';

import MessageBubble from './MessageBubble'



function ChatView(){
    const messagesEndRef = useRef(null); 
    const[data, setData] = useState([]);
    const[inputVal, setInputVal] = useState("");
    const[cmessage, setcMessage] = useState([]);

   useEffect(() => {
    socket.on('history', (messages) => setData(messages) );
   reciveingMessage();
   scrollToBottom();
   }, []);

   useEffect(() => {
    setData((val) => [...val, cmessage]);
    scrollToBottom();
   }, [cmessage]);

   const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
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

  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
    return <div ref={elementRef} />;
  };

    return(
        <div className='chatview'>
            <div className='chat-screen'>
                {data.map((val) => (
                    <MessageBubble  key={val._id}  message={val.quotes} user={val.user} />
                    ))}
                    <AlwaysScrollToBottom/>
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