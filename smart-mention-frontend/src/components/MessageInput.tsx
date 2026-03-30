import React, { useState } from "react";
import "./MessageInput.css";

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      setValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-container">
      <div className="message-input-row">
        <input
          className="message-input-field"
          placeholder="Type a message... Use @ to mention a group"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="message-send-btn"
          aria-label="Send"
          onClick={handleSend}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="message-input-hint">Press <kbd>Enter</kbd> to send &bull; <kbd>Shift+Enter</kbd> for new line</div>
    </div>
  );
};

export default MessageInput;
