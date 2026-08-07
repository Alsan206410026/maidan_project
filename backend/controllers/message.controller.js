const Conversation = require("../model/Conversation");
const Message = require("../model/Message");

const { getIO } = require("../config/socket");
const { getUserSocket } = require("../socket/userSocketMap");

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Find existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create conversation if it doesn't exist
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    // Add message to conversation
    conversation.messages.push(newMessage._id);

    // Save conversation and message together
    await Promise.all([
      conversation.save(),
      newMessage.save(),
    ]);

  
    // Socket.IO
  

    const receiverSocketId = getUserSocket(receiverId);

    if (receiverSocketId) {
      const io = getIO();

      io.to(receiverSocketId).emit("newMessage", newMessage);

      console.log(
        `Realtime message sent to user ${receiverId}`
      );
    }

    return res.status(201).json({
      message: "Message sent successfully",
      data: newMessage,
    });

  } catch (error) {
    console.error("Error sending message:", error);

    return res.status(500).json({
      message: "An error occurred while sending the message.",
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    // Find conversation
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({
        message: "No conversation found between the users.",
      });
    }

    return res.status(200).json(conversation.messages);

  } catch (error) {
    console.error("Error retrieving messages:", error);

    return res.status(500).json({
      message: "An error occurred while retrieving messages.",
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};