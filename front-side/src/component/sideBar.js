import React,{useState, useEffect, useRef}from 'react';
import './sideBar.css';
import img from '../img.png';
import socket from '../global';

import { motion, AnimatePresence } from "framer-motion";


function SideBar() {
    const messagesEndRef = useRef(null);
    const [isVisible, setVisible] = useState(true);
    const[userCount, setUserCount] = useState(0);
    const[usersConntected, setUsersConntected] = useState([]);
    let initialState = null;

    useEffect(() => {
        usersCount();
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
        connectUser();
    }, []);

    useEffect(() => {
        scrollToBottom();
        disconnectedUser();
        
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
    function connectUser() {
        socket.on("sendUser2", (user) => {
            initialState = user;
            setUsersConntected((val) => [...val, initialState + " has conneted"]);
        },[initialState]);
         setVisible(false);
         timeout(1000);
         setVisible(true);
    }

    function disconnectedUser(){
        socket.on("disconnectedUser", (user) => {
            setUsersConntected((val) => [...val, user + " has DisConnected"]);
            initialState = user;
        
            });
    }

    function usersCount(){
        socket.on("sendUserCount", (value) => {
            setUserCount(value);
            //setVisible(!isVisible);
         });
         console.log('i fire once');
    }
    
    const AlwaysScrollToBottom = () => {
        const elementRef = useRef();
        useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
        return <div ref={elementRef} />;
      };

    function timeout(number) {
        return new Promise( res => setTimeout(res, number));
    }
    

    return (
        <div className='sidebar'>
                <div className="img-container">
                    <img src={img} alt='img' className='img'/>
                    <p>big</p>
                 </div>

                 <div className='pressence-container'>{userCount === null ? 0 : userCount} Users Connected</div>
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                        onTap={() => setVisible(!isVisible)}
                            style={{
                            width: 40,
                            height: 40,
                            borderRadius: 15,
                            backgroundColor: "#fff"
                            }}
                            initial={{ opacity: 0, scale: 0.75 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                        />
                    )}
                </AnimatePresence>

                <div className='notification-container'>
                    <p>Notifcations</p>
                    {usersConntected === null ? <div/> : 
                    usersConntected.map((index) => (index.includes('DisConnected') ?
                        <div
                        style={{
                        marginTop: "10px",
                        backgroundColor: "#f28787",
                        color:"#fff"
                        }}
                        >{index}</div>
                        :
                        <div
                        style={{
                        marginTop: "10px",
                        backgroundColor: "rgb(255, 217, 254)",
                        color:"#0eac28"
                        }}
                        >{index}</div>

                    ))
                    }
                    <AlwaysScrollToBottom />
                </div>
            
        </div>
    );
}

export default SideBar;