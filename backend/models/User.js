const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  profileImage: { type: Buffer }, // Store image as binary data (Buffer)
  backgroundImage: { type: Buffer }, // Store background image as binary data (Buffer)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
