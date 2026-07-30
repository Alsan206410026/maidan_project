//send events to specific user

const WebSocket = require("ws");
const clients = require("./clients");

function sendToUser(userId, payload) {

    const socket = clients.get(userId.toString());

    if (
        socket &&
        socket.readyState === WebSocket.OPEN
    ) {

        socket.send(JSON.stringify(payload));

    }

}

module.exports = sendToUser;