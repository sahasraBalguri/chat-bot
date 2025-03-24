const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
try{
  const{username, email, password}= req.body;

  let user = await User.findOne({ $or: [{ email }, { username }] });
   if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
