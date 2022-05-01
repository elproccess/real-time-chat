import React,{useState, useEffect}from 'react';
import './sideBar.css';
import img from '../img.png';
import socket from '../global';

import { motion, AnimatePresence } from "framer-motion";


function SideBar() {
    const [isVisible, setVisible] = useState(true);
    const[userCount, setUserCount] = useState(0);
    const[usersConntected, setUsersConntected] = useState([]);
    const[usersDisConntected, setUsersDisConntected] = useState("");
    const[Conntected, setConntected] = useState("");
    let initialState = null;
    let array = [];

    useEffect(() => {
        socket.on("sendUserCount", (value) => {
            setUserCount(value);
            setVisible(!isVisible);
        });
        socket.on("sendUser", (user) => {
            initialState = user;
            console.log(user);
            setUsersConntected(initialState);
        });
            console.log(array);
    });

    useEffect(() => {
        connectUser();
        
    }, []);
    

    useEffect(() => {
        disconnectedUser();
        setUsersConntected((val) => [...val, usersDisConntected + " has disconneted"]);
    },[usersDisConntected] );

    function connectUser() {
        socket.on("sendUser2", (user) => {
            initialState = user;
            setConntected(user);
        });
    }

    function disconnectedUser(){
        socket.on("disconnectedUser", (user) => {
            initialState = user;
            setUsersDisConntected(user);
            });
    }


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
                 <motion.div
                    style={{
                    width: 75,
                    height: 75,
                    borderRadius: 30,
                    backgroundColor: "rgba(255,255,255,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer"
                    }}
                    onTap={() => setVisible(!isVisible)}
                >
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
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
                </motion.div>

                <div className='notification-container'>
                    <p>Notifcations</p>
                    {usersConntected === null ? <div/> : 
                    usersConntected.map((index) => (
                        <p>{index}</p>
                    ))
                    } has Connected
                </div>
            
        </div>
    );
}

export default SideBar;