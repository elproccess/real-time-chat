import socketIOClient from "socket.io-client";

var socket = socketIOClient("http://localhost:3002");

export default socket;