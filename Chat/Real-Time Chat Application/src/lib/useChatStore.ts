import { useState, useEffect, useRef } from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const botResponses = [
  "That's interesting! Tell me more.",
  "I completely understand what you mean.",
  "Thanks for sharing that with me!",
  "That makes a lot of sense.",
  "I appreciate you telling me this.",
  "How does that make you feel?",
  "That's a great perspective!",
  "I'm here to listen whenever you need.",
];

export function useChatStore() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! How are you doing today?",
      sender: "bot",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      text: "I'm doing great! Just working on some interesting projects.",
      sender: "user",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "3",
      text: "That sounds exciting! What kind of projects are you working on?",
      sender: "bot",
      timestamp: new Date(Date.now() - 2400000),
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate bot typing
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500 + Math.random() * 1000);
  };

  return {
    messages,
    isTyping,
    sendMessage,
    messagesEndRef,
  };
}