const Chat = require("../model/Chat");

// Get all chats of logged-in user
const getMyChats = async (req, res) => {

    try {

        const chats = await Chat.find({
            $or: [
                { sender: req.user._id },
                { receiver: req.user._id }
            ]
        })
            .populate("sender", "fullName email role")
            .populate("receiver", "fullName email role")
            .sort({ createdAt: 1 });

        return res.status(200).json(chats);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};


// Get chat history with a specific user
const getChatHistory = async (req, res) => {

    try {

        const { userId } = req.params;

        const chats = await Chat.find({
            $or: [
                {
                    sender: req.user._id,
                    receiver: userId
                },
                {
                    sender: userId,
                    receiver: req.user._id
                }
            ]
        })
            .populate("sender", "fullName email role")
            .populate("receiver", "fullName email role")
            .sort({ createdAt: 1 });

        return res.status(200).json(chats);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};


// Mark one message as read
const markAsRead = async (req, res) => {

    try {

        const { messageId } = req.params;

        const message = await Chat.findById(messageId);

        if (!message) {

            return res.status(404).json({
                message: "Message not found"
            });

        }

        if (message.receiver.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "Unauthorized"
            });

        }

        message.isRead = true;

        await message.save();

        return res.status(200).json({
            message: "Message marked as read"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};


// Mark all messages from one user as read
const markAllAsRead = async (req, res) => {

    try {

        const { userId } = req.params;

        await Chat.updateMany(
            {
                sender: userId,
                receiver: req.user._id,
                isRead: false
            },
            {
                isRead: true
            }
        );

        return res.status(200).json({
            message: "All messages marked as read"
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    getMyChats,
    getChatHistory,
    markAsRead,
    markAllAsRead
};