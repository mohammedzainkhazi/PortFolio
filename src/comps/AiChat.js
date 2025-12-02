import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from "@heroicons/react/solid";
import { queryAI } from './ChatService';

function AiChat() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Zain's AI assistant. Ask me anything about his skills, projects, or background.", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const queries = [
    "What are your skills?",
    "Where did you study?",
    "Tell me about your projects.",
    "How can I contact you?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
        const response = await queryAI(text);
        setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
    } catch (error) {
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now.", sender: 'ai' }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl h-full flex flex-col glass-card rounded-2xl overflow-hidden border border-slate-700/50 relative">

        {/* Header */}
        <div className="p-4 border-b border-slate-700/50 flex items-center bg-slate-900/50">
            <SparklesIcon className="h-6 w-6 text-purple-500 mr-2" />
            <h2 className="font-bold text-white">Ask AI about Zain</h2>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-slate-700/50 text-slate-200 rounded-bl-none'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                     <div className="bg-slate-700/50 text-slate-200 rounded-2xl rounded-bl-none px-4 py-3 flex items-center space-x-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                     </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {queries.map((q, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="text-left text-sm text-slate-400 hover:text-white hover:bg-slate-700/50 p-2 rounded-lg transition-colors border border-slate-700/30"
                    >
                        {q}
                    </button>
                ))}
            </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-slate-900/50 border-t border-slate-700/50">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700 hover:border-blue-500/50 transition-colors focus-within:border-blue-500">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                    placeholder="Type your question..."
                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500"
                    disabled={isTyping}
                />
                <button
                    onClick={() => handleSend(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AiChat;
