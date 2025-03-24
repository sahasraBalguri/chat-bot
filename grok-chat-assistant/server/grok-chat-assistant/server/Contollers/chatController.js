const Chat = require('../models/Chat');
const grokService = require('../services/grokService');

exports.getChats = asu=ync (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id}).sort ({ updatedAt: -1});
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error'});
  }
};
