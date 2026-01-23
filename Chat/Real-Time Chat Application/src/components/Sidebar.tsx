import { useState, useEffect } from "react";
import type { User, Chat} from "../types/user";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Search , Users } from "lucide-react";

interface SidebarProps {
  currentUser: User;
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Sidebar({
  currentUser,
  selectedChat,
  onSelectChat,
  searchQuery,
  onSearchChange,
}: SidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Mock data
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "SJ",
        status: "online",
        lastSeen: new Date(),
      },
      {
        id: "3",
        name: "Mike Chen",
        email: "mike@example.com",
        avatar: "MC",
        status: "away",
        lastSeen: new Date(Date.now() - 1800000),
      },
      {
        id: "4",
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "ED",
        status: "offline",
        lastSeen: new Date(Date.now() - 3600000),
      },
      {
        id: "5",
        name: "Robert Wilson",
        email: "robert@example.com",
        avatar: "RW",
        status: "online",
        lastSeen: new Date(),
      },
    ];

    const mockChats: Chat[] = mockUsers.map((user) => ({
      id: user.id,
      participants: [currentUser.id, user.id],
      lastMessage: {
        id: Date.now().toString() + user.id,
        text: user.id === "2" ? "Hey! How are you doing?" : 
              user.id === "3" ? "Can we schedule a call?" :
              user.id === "4" ? "Thanks for your help!" :
              "See you tomorrow!",
        senderId: user.id,
        receiverId: currentUser.id,
        timestamp: new Date(Date.now() - Math.random() * 86400000),
        status: "seen",
        type: "text",
      },
      unreadCount: user.id === "2" ? 2 : 0,
      createdAt: new Date(Date.now() - Math.random() * 604800000),
    }));

    setUsers(mockUsers);
    setChats(mockChats);
  }, [currentUser.id]);

  const filteredChats = chats.filter((chat) => {
    const otherUser = users.find((u) => u.id === chat.participants.find((p) => p !== currentUser.id));
    return otherUser?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-400";
      default: return "bg-gray-400";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / 86400000);
    
    if (days === 0) {
      return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    } else if (days === 1) {
      return "Yesterday";
    } else if (days < 7) {
      return date.toLocaleDateString("en-US", { weekday: "short" });
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">Messages</h1>
          <Button variant="ghost" size="sm">
            <Users className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => {
          const otherUser = users.find((u) => u.id === chat.participants.find((p) => p !== currentUser.id));
          if (!otherUser) return null;
          
          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedChat === chat.id ? "bg-green-50 border-l-4 border-green-500" : ""
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
                    {otherUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(otherUser.status)} rounded-full border-2 border-white`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">{otherUser.name}</h3>
                  <span className="text-xs text-gray-500">
                    {chat.lastMessage && formatTime(chat.lastMessage.timestamp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage?.text}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}