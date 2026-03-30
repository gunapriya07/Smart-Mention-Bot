const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  time: { type: String, required: true },
  fromBot: { type: Boolean, default: false },
  group: { type: String, required: true },
  username: { type: String }
});

module.exports = mongoose.model('Message', messageSchema);