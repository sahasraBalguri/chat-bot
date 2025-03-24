const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
try{
  const{username, email, password}= req.body;

  let user
