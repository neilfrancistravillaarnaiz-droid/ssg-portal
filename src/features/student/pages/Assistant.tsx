import { Bot, Send } from "lucide-react";

export default function Assistant() {
  return (
    <div className="student-page">
      <div className="page-title">
        <Bot size={26} />
        <div>
          <h1>AI Assistant</h1>
          <p>Ask questions about events, sanctions, forms, and services.</p>
        </div>
      </div>

      <div className="chat-panel">
        <div className="chat-message bot">
          Hello! I am StudentHub Assistant. How can I help you today?
        </div>

        <div className="chat-input-area">
          <input placeholder="Ask anything..." />
          <button>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}