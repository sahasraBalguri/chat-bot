const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
try{
  const{username, email, password}= req.body;

  let user = await User.findOne({ $or: [{ email }, { username }] });
   if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

  user = new User({
      username,
      email,
      password
    });

  await user.save();
   const payload = {
      user: {
        id: user.id,
        username: user.username
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
