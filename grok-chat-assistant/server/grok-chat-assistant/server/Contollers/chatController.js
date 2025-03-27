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
   const chat = await Chat.findOne({_id: req.params.id, user: req.user.id});

  try {
   
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
    const chat = await newchat.save();
    res.json(chat);
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({message" 'Server error'});
 }
};

exports.sendMessage =  async (req, res)=> {
  try{
    const {content} = req.body;

    if(!content) {
      retutn res.status(400).json ({message: 'Message content is required'});
    }
    let chat = await Chat.findOne({_id: req.params.id, user: req.user.id});

    if(!chat) {
      return res.status(404).json({message:'Chat not found'});
      
    }
    //Add user msg
    const userMessage = {
      role: 'user',
      content,
      timestamp:new Date()
    };
      chat.messages.push(userMessage);

const grokMessages = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.content
}));

    const grokResponse = await grokService.generateResponse(grokMessages);

    const assistantMessage = {
      role: 'assistant',
      content: grokResponse.content,
      timestamp: new Date()
    };
    
    chat.messages.push(assistantMessage);
    chat.updatedAt = new Date();

    if (chat.title === 'New Chat' && chat.messages.length === 2) {
      chat.title = content.substring(0, 30) + (content.length > 30 ? '...' : '');
    }
    
    await chat.save();
    res.json({
      userMessage,
      assistantMessage,
      chatId: chat._id
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }
    
    res.json({ message: 'Chat deleted' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
