// socket/userSocketMap.js

const userSocketMap = new Map();


const addUser = (userId, socketId) => {
    userSocketMap.set(userId, socketId);
};


const getUserSocket = (userId) => {
    return userSocketMap.get(userId);
};


const removeUser = (userId) => {
    userSocketMap.delete(userId);
};


module.exports = {
    addUser,
    getUserSocket,
    removeUser,
    userSocketMap
};