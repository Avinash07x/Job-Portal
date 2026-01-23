import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Send, Paperclip, Smile, Mic } from "lucide-react";

interface MessageInputProps {
  onSend: (message: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center gap-2">
        <Button type="button" variant="ghost" size="sm">
          <Paperclip className="w-5 h-5 text-gray-500" />
        </Button>
        
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="pr-10 border-gray-300 focus:border-green-500 focus:ring-green-500/20"
          />
          <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
            <Smile className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
        
        {message.trim() ? (
          <Button type="submit" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
            <Send className="w-5 h-5" />
          </Button>
        ) : (
          <Button type="button" variant="ghost" size="sm">
            <Mic className="w-5 h-5 text-gray-500" />
          </Button>
        )}
      </div>
    </form>
  );
}