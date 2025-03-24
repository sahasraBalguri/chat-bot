const Chat = require('../models/Chat');
const grokService = require('../services/grokService');

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id}).sort ({ updatedAt: -1});
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error'});
  }
};

exports.getChatById = async (req, res) => {
  try {
    const chat = await Chat.findOne({_id: req.params.id, user: req.user.id});

    if(!chat) {
      return res.status(404).json({ message: 'Chat not found'});
  }
    res.json(chat);
} catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json ({message: 'server error'});
  }
};
exports.createChat = async(req, res)=> {
  try {
    const newChat = nw chat ({
      user: req.user.id,
      title: req.body.title || 'New chat',
      messages: []
    });
    const 
  }
}
