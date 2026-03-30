

import React, { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";
import type { Message } from "./components/types";
import "./App.css";

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hey! 👋 I'm the Smart Mention Bot. Type a message and use @ to mention a group. I'll help you route your message to the right team!",
      time: "11:38 AM",
      fromBot: true,
    },
  ]);

  const addMessage = (text: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { text, time }]);
  };

  return (
    <div className="app-bg">
      <div className="app-chat-container">
        <ChatHeader />
        <div className="app-chat-main">
          <MessageList messages={messages} />
          <MessageInput onSend={addMessage} />
        </div>
      </div>
    </div>
  );
};

export default App;