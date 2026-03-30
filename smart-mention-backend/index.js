require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Message = require('./Message');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/smartmention');

// Socket.IO connection
io.on('connection', (socket) => {
  socket.on('join-group', (group) => {
    socket.join(group);
  });
});

// Store message and reply
app.post('/api/message', async (req, res) => {
  const { text, group, username } = req.body;
  if (!group || !username) {
    return res.status(400).json({ error: 'Group and username are required' });
  }
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // Store user message
  const userMsg = await Message.create({ text, time, fromBot: false, group, username });
  io.to(group).emit('new-message', userMsg);
  // Store bot reply
  const reply = `Bot received: ${text}`;
  const botTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const botMsg = await Message.create({ text: reply, time: botTime, fromBot: true, group, username: 'Bot' });
  io.to(group).emit('new-message', botMsg);
  res.json({ reply });
});

// Get all messages
app.get('/api/messages', async (req, res) => {
  const { group } = req.query;
  if (!group) {
    return res.status(400).json({ error: 'Group is required' });
  }
  const messages = await Message.find({ group }).sort({ _id: 1 });
  res.json(messages);
});

server.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
