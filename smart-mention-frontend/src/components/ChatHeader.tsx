import React from "react";
import "./ChatHeader.css";

const ChatHeader: React.FC = () => (
  <header className="chat-header">
    <div className="header-icon">
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <rect x="4" y="4" width="16" height="16" rx="6" fill="currentColor" />
        <path d="M9 9h6v6H9z" fill="#181028" />
      </svg>
    </div>
    <div>
      <h1 className="header-title">Smart Mention Bot</h1>
      <div className="header-desc">Use <span className="mention">@</span> to mention groups &bull; Always online</div>
    </div>
    <div className="header-status">
      <span className="header-status-dot"></span>
    </div>
  </header>
);

export default ChatHeader;
