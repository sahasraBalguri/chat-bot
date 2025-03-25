const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);
router.get('/', chatController.getChats);
router.get('/:id', chatController.getChatById);
