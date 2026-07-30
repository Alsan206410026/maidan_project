const { WebSocketServer } = require("ws");

const clients = require("./clients");
const chatHandler = require("./chatHandler");

function initializeWebSocket(server) {

    const wss = new WebSocketServer({ server });

    console.log("WebSocket Server Started");

    wss.on("connection", (ws) => {

        console.log("New Client Connected");

        //ws.on means when the server receives a message from the client

        ws.on("message", async (message) => { 


            try {

                const data = JSON.parse(message.toString());

                console.log("Received:", data);

                // Register user
                if (data.type === "register") {

                    if (!data.userId) {
                        return;
                    }

                    clients.set(data.userId.toString(), ws);

                    console.log(`User Registered: ${data.userId}`);

                    return;
                }

                // Chat message
                if (data.type === "chat") {

                    await chatHandler(data);

                    return;
                }

            } catch (err) {

                console.log("WebSocket Error:", err.message);

            }

        });

        ws.on("close", () => {

            for (const [userId, socket] of clients.entries()) {

                if (socket === ws) {

                    clients.delete(userId);

                    console.log(`User Disconnected: ${userId}`);

                    break;

                }

            }

        });

        ws.on("error", (err) => {

            console.log("WebSocket Connection Error:", err.message);

        });

    });

}

module.exports = initializeWebSocket;