
import React, { useState, useRef, useEffect } from 'react';
import { streamFashionAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

interface FashionAssistantProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatModal: React.FC<FashionAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add a placeholder for the model's response
    setMessages(prev => [...prev, { role: 'model', content: '' }]);

    try {
        const stream = streamFashionAdvice(input, []); // History is managed by the service
        for await (const chunk of stream) {
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === 'model') {
                    lastMessage.content += chunk;
                }
                return newMessages;
            });
        }
    } catch (error) {
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
                lastMessage.content = "Sorry, something went wrong. Please try again.";
            }
            return newMessages;
        });
    } finally {
        setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:right-8 w-[calc(100%-2rem)] sm:w-96 h-[60vh] sm:h-[70vh] max-h-[600px] z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl h-full flex flex-col animate-fade-in-up">
            <header className="bg-indigo-500 p-4 rounded-t-2xl text-white flex justify-between items-center">
                <h3 className="font-bold text-lg">Fashion Assistant</h3>
                <button onClick={onClose} className="hover:bg-indigo-600 p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                    <div className="flex justify-start">
                        <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg max-w-xs">
                            <p className="text-sm">Hi! How can I help you with your style today?</p>
                        </div>
                    </div>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                <p className="text-sm">{msg.content}{msg.role === 'model' && isLoading && index === messages.length - 1 && <span className="inline-block w-2 h-2 ml-1 bg-current rounded-full animate-ping"></span>}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask for fashion advice..."
                        className="flex-1 bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-full py-2 px-4"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600 disabled:bg-indigo-300 transition">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};


export const FashionAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-6 z-40 bg-indigo-500 text-white rounded-full p-4 shadow-lg hover:bg-indigo-600 transition-transform transform hover:scale-110"
                aria-label="Open Fashion Assistant"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </button>
            <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    )
}
