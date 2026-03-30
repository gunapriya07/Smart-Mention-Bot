import React from "react";
import "./MessageList.css";
import type { Message } from "./types";

interface MessageListProps {
  messages: Message[];
  username?: string;
}




const MessageList: React.FC<MessageListProps> = ({ messages, username }) => (
  <div className="message-list-container">
    {messages.map((msg, idx) => (
      <div
        className="message-row"
        key={idx}
        style={msg.fromBot
          ? { justifyContent: 'center' }
          : { justifyContent: msg.username === username ? 'flex-end' : 'flex-start' }}
      >
        <div className="message-bubble">
          <span className="message-user" style={{ fontWeight: 600, color: msg.fromBot ? '#bdb7e2' : msg.username === username ? '#6c63ff' : '#fff', marginRight: 6 }}>
            {msg.fromBot ? 'Bot' : msg.username || 'User'}
          </span>
          <span className="message-text">{msg.text}</span>
          <span className="message-time">{msg.time}</span>
          <span className="message-group">[{msg.group}]</span>
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;
