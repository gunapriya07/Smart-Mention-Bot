

import React, { useState, useEffect, useRef } from "react";

import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import type { Message } from "./components/types";
import "./App.css";
import "./GroupSelector.css";
import { io, Socket } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [group, setGroup] = useState<string>("general");
  const [username, setUsername] = useState<string>(() => localStorage.getItem('username') || "");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const groupToUse = group && group.trim() ? group : "general";
    fetch(`${API_URL}/api/messages?group=${encodeURIComponent(groupToUse)}`)
      .then(res => res.json())
      .then(data => {
        setMessages(Array.isArray(data) ? data.filter(m => m.text && m.time) : []);
      })
      .catch(() => {
        setMessages([
          {
            text: `Hey! 👋 I'm the Smart Mention Bot. Type a message and use @ to mention a group. I'll help you route your message to the right team!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fromBot: true,
            group: groupToUse,
          },
          {
            text: "(Could not load chat history)",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fromBot: true,
            group: groupToUse,
          }
        ]);
      });
  }, [group]);

  // Socket.IO real-time connection
  useEffect(() => {
    const groupToUse = group && group.trim() ? group : "general";
    // Disconnect previous socket if any
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
    const socket = io(API_URL);
    socketRef.current = socket;
    socket.emit('join-group', groupToUse);
    socket.on('new-message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socket.disconnect();
    };
  }, [group]);

  const addMessage = async (text: string) => {
    const groupToUse = group && group.trim() ? group : "general";
    try {
      await fetch(`${API_URL}/api/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, group: groupToUse, username })
      });
      // No need to reload, real-time will update
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Bot error: could not reach backend.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), fromBot: true, group: groupToUse }]);
    }
  };

  return (
    <div className="app-bg">
      <div className="app-chat-container">
        <ChatHeader />
        <div className="group-selector-row" style={{ gap: 16 }}>
          <label htmlFor="username-input" className="group-selector-label">Username:</label>
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              localStorage.setItem('username', e.target.value);
            }}
            placeholder="Enter your name"
            className="group-selector-input"
            style={{ width: 120 }}
            autoComplete="off"
          />
          <label htmlFor="group-select" className="group-selector-label">Group:</label>
          <input
            id="group-select"
            type="text"
            value={group}
            onChange={e => setGroup(e.target.value)}
            placeholder="Enter group name"
            className="group-selector-input"
            autoComplete="off"
          />
        </div>
        <div className="app-chat-main">
          <MessageList messages={messages} username={username} />
          <MessageInput onSend={addMessage} disabled={!username.trim()} />
        </div>
      </div>
    </div>
  );
};

export default App;