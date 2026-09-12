'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Send, Bot, User, X, Sparkles } from 'lucide-react';
import { ChatSession } from './GrokChat';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChatBot = ({ isOpen, onClose }: AIChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I am Zain's Interstellar AI Assistant. Ask me anything about Zain's engineering experience, skills, projects at Shell, or technical expertise!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const session = useRef<ChatSession | null>(null);

  if (!session.current) {
    session.current = new ChatSession();
  }

  const suggestedQuestions = [
    "What technologies does Zain specialize in?",
    "Tell me about Zain's work at Shell",
    "What is Zain's experience with AI & Cloud?",
    "What certifications does Zain hold?"
  ];

  const getAIResponse = async (question: string): Promise<string> => {
    return await session.current!.chat(question);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: await getAIResponse(content),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[85vh] flex flex-col glass-interstellar border-amber-400/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.2)]">
        
        {/* Modal Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-5 border-b border-white/10 shrink-0 bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 p-[1px] shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <CardTitle className="text-base font-bold text-gradient-cosmic">Zain's AI Intelligence</CardTitle>
              <p className="text-xs text-gray-400 font-mono">Ask about full-stack skills, experience, & achievements</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </CardHeader>

        {/* Messages Body */}
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden min-h-0 bg-black/30">
          <div className="flex-1 overflow-auto p-5 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300' 
                    : 'bg-purple-500/20 border border-purple-400/40 text-purple-300'
                }`}>
                  {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>

                <div className={`max-w-[82%] space-y-1 ${
                  message.sender === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-sans ${
                    message.sender === 'user'
                      ? 'bg-amber-500/20 border border-amber-400/40 text-amber-100 rounded-tr-none'
                      : 'glass-interstellar border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {message.content}
                  </div>
                  <p className="text-[10px] font-mono text-gray-500 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="glass-interstellar p-4 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="p-4 border-t border-white/10 bg-white/5 shrink-0 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 uppercase">
                <Sparkles className="h-3.5 w-3.5" /> Suggested Inquiries:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-[11px] font-medium px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-amber-400/40 hover:bg-amber-500/10 transition-all text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-4 border-t border-white/10 bg-black/50 shrink-0">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask AI about Zain's skills, projects, or background..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputValue)}
                className="flex-1 bg-white/5 border-white/15 text-white placeholder:text-gray-500 rounded-xl text-xs sm:text-sm focus:border-amber-400"
              />
              <Button 
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="btn-shiny bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-4 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AIChatBot;