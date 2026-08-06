const Conversation = require("../model/Conversation");
const Message = require("../model/Message");

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
        messages: [], // Initialize messages as an empty array
      });
    }

    // Create new message
    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });


    // Add message to conversation
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }


    //socket.io logic




    //Save in database long way
    // await conversation.save();
    // await newMessage.save();


 //save both conversation and message in parallel
    await Promise.all([
      conversation.save(),
      newMessage.save()
    ]);

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
  try{
    const {id: userToChatId} = req.params;
    const senderId = req.user._id;

    // Find the conversation between the two users
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(404).json({
        message: "No conversation found between the users.",
      });
    }

    const messages = conversation.messages

    res.status(200).json(messages);


  }
  catch (error) {
    console.error("Error retrieving messages:", error);
    return res.status(500).json({
      message: "An error occurred while retrieving messages.",
    });
  }
}

module.exports = {
  sendMessage,
  getMessages
};