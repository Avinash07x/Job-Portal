import { useState, useEffect, useRef } from "react";
import type { User, Message } from "../types/user";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Phone, Video, MoreVertical } from "lucide-react";

interface ChatWindowProps {
  currentUser: User;
  selectedChat: string | null;
}

export function ChatWindow({ currentUser, selectedChat }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock other user data
  useEffect(() => {
    if (selectedChat) {
      const mockUsers: Record<string, User> = {
        "2": {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          avatar: "SJ",
          status: "online",
          lastSeen: new Date(),
        },
        "3": {
          id: "3",
          name: "Mike Chen",
          email: "mike@example.com",
          avatar: "MC",
          status: "away",
          lastSeen: new Date(Date.now() - 1800000),
        },
        "4": {
          id: "4",
          name: "Emily Davis",
          email: "emily@example.com",
          avatar: "ED",
          status: "offline",
          lastSeen: new Date(Date.now() - 3600000),
        },
        "5": {
          id: "5",
          name: "Robert Wilson",
          email: "robert@example.com",
          avatar: "RW",
          status: "online",
          lastSeen: new Date(),
        },
      };
      
      setOtherUser(mockUsers[selectedChat] || null);
      
      // Load mock messages
      const mockMessages: Message[] = [
        {
          id: "1",
          text: "Hey! How are you doing?",
          senderId: selectedChat,
          receiverId: currentUser.id,
          timestamp: new Date(Date.now() - 3600000),
          status: "seen",
          type: "text",
        },
        {
          id: "2",
          text: "I'm doing great! Just working on some projects.",
          senderId: currentUser.id,
          receiverId: selectedChat,
          timestamp: new Date(Date.now() - 3000000),
          status: "seen",
          type: "text",
        },
        {
          id: "3",
          text: "That sounds exciting! What kind of projects?",
          senderId: selectedChat,
          receiverId: currentUser.id,
          timestamp: new Date(Date.now() - 2400000),
          status: "seen",
          type: "text",
        },
      ];
      
      setMessages(mockMessages);
    }
  }, [selectedChat, currentUser.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!selectedChat || !otherUser) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      senderId: currentUser.id,
      receiverId: selectedChat,
      timestamp: new Date(),
      status: "sent",
      type: "text",
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "delivered" as const } : msg
        )
      );
    }, 1000);
    
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === newMessage.id ? { ...msg, status: "seen" as const } : msg
        )
      );
    }, 2000);
    
    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That's interesting! Tell me more.",
        "I completely understand what you mean.",
        "Thanks for sharing that with me!",
        "That makes a lot of sense.",
        "I appreciate you telling me this.",
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        senderId: selectedChat,
        receiverId: currentUser.id,
        timestamp: new Date(),
        status: "sent",
        type: "text",
      };
      
      setMessages((prev) => [...prev, botMessage]);
      
      // Show browser notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`${otherUser.name} sent a message`, {
          body: botMessage.text,
          icon: "/favicon.ico",
        });
      }
    }, 2000 + Math.random() * 1000);
  };

  if (!selectedChat || !otherUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">💬</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to Chat</h3>
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  const getStatusText = () => {
    switch (otherUser.status) {
      case "online": return "Active now";
      case "away": return "Away";
      case "offline": return `Last seen ${otherUser.lastSeen?.toLocaleTimeString()}`;
      default: return "Offline";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
              {otherUser.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-gray-800">{otherUser.name}</h2>
            <p className="text-xs text-gray-500">{getStatusText()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUser.id}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input */}
      <MessageInput onSend={sendMessage} />
    </div>
  );
}