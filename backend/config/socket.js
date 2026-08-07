// config/socket.js

const { Server } = require("socket.io");

let io;


const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "http://localhost:5180",
            credentials: true
        }
    });

    return io;
};


const getIO = () => {
    return io;
};


module.exports = {
    initializeSocket,
    getIO
};