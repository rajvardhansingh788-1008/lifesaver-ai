import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../api/client';
import './ChatBot.css';

// AI Brain SVG Icon
const AiIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="url(#ai-grad)" opacity="0.15"/>
    <circle cx="9" cy="10" r="1.5" fill="currentColor"/>
    <circle cx="15" cy="10" r="1.5" fill="currentColor"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12h2M20 12h2M12 2v2M12 20v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    <defs>
      <linearGradient id="ai-grad" x1="2" y1="2" x2="22" y2="22">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#a855f7"/>
      </linearGradient>
    </defs>
  </svg>
);

// Bot message avatar SVG
const BotAvatar = () => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" className="chatbot-bot-svg">
    <rect x="3" y="4" width="18" height="14" rx="4" fill="url(#bot-grad)" opacity="0.2" stroke="#6366f1" strokeWidth="1.5"/>
    <circle cx="9" cy="11" r="1.5" fill="#6366f1"/>
    <circle cx="15" cy="11" r="1.5" fill="#6366f1"/>
    <path d="M9 15c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5" stroke="#6366f1" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M12 4V2" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="12" cy="1.5" r="1" fill="#a855f7"/>
    <defs>
      <linearGradient id="bot-grad" x1="3" y1="4" x2="21" y2="18">
        <stop stopColor="#6366f1"/>
        <stop offset="1" stopColor="#a855f7"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: '👋 **Hi! I\'m LifeSaver AI Assistant.**\n\nAsk me anything about disaster safety!\n\nExamples:\n- "What to do during an earthquake?"\n- "How to use a fire extinguisher?"\n- "Emergency numbers"'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const msg = input.trim();
    if (!msg || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await sendChatMessage(msg);
      setMessages(prev => [...prev, {
        role: 'bot',
        text: res.data.reply
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'bot',
        text: '❌ Sorry, something went wrong. Please try again!'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown-like rendering for bold text
  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
    });
  };

  return (
    <>
      {/* Floating AI button */}
      <button
        className={`chatbot-fab ${open ? 'chatbot-fab-hidden' : ''}`}
        onClick={() => setOpen(true)}
        title="Chat with LifeSaver AI"
      >
        <span className="chatbot-fab-icon"><AiIcon /></span>
        <span className="chatbot-fab-pulse"></span>
        <span className="chatbot-fab-label">AI Chat</span>
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-avatar"><BotAvatar /></span>
              <div>
                <span className="chatbot-title">LifeSaver AI</span>
                <span className="chatbot-subtitle">⚡ AI Disaster Safety Assistant</span>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg-${msg.role}`}>
                {msg.role === 'bot' && <span className="chatbot-msg-avatar"><BotAvatar /></span>}
                <div className={`chatbot-bubble chatbot-bubble-${msg.role}`}>
                  {renderText(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg chatbot-msg-bot">
                <span className="chatbot-msg-avatar"><BotAvatar /></span>
                <div className="chatbot-bubble chatbot-bubble-bot">
                  <div className="chatbot-typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about disaster safety..."
              disabled={loading}
              autoFocus
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
