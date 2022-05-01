import React from "react";
import './App.css';

import socket from './global'

import SideBar from './component/sideBar';
import ChatView from "./component/chatView";


function App() {
  const [data, setData] = React.useState([]);
  const [newData, setNewData] = React.useState([]);
  
  let array = [];
  React.useEffect(() => {

    socket.on('history', (messages) => setData(messages) );
    console.log(data);
    data.map(index => {
      console.log(index.quotes);
    });

    window.addEventListener('unload', handleTabClosing)
    
  }, []);

  
  const handleTabClosing = () => {
    var huil = 0;
    console.log("hbhjbj");
    socket.emit('sendUserCount', huil);
    socket.emit('disconnect');
    socket.close();
  }

  
  return (
    <div className="App">
      <div className="app-container">
      <SideBar></SideBar>
      <ChatView chat={data}></ChatView>
      </div>
    </div>
  );

}

export default App;

