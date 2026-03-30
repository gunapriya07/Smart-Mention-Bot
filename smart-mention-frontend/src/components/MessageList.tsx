import React from "react";
import "./MessageList.css";
import type { Message } from "./types";

interface MessageListProps {
  messages: Message[];
}




const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div className="message-list-container">
    {messages.map((msg, idx) => (
      <div
        className="message-row"
        key={idx}
        style={msg.fromBot
          ? { justifyContent: 'center' }
          : { justifyContent: 'flex-end' }}
      >
        <div className="message-bubble">
          <span className="message-text">{msg.text}</span>
          <span className="message-time">{msg.time}</span>
        </div>
      </div>
    ))}
  </div>
);

export default MessageList;
