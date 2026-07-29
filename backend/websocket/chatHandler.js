const Chat = require("../model/Chat");
const sendToUser = require("./sendToUser");

async function chatHandler(data) {

    try {

        const chat = await Chat.create({

            sender: data.sender,
            receiver: data.receiver,
            message: data.message

        });

        // Send message to receiver
        sendToUser(
            data.receiver,
            {
                type: "chat",
                chat
            }
        );

        // Send back to sender (confirmation)
        sendToUser(
            data.sender,
            {
                type: "chat",
                chat
            }
        );

    } catch (err) {

        console.log("Chat Error:", err.message);

    }

}

module.exports = chatHandler;