import { useState, useEffect } from "react";

export function TypingIndicator() {
  const [dots, setDots] = useState([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.map(dot => (dot + 1) % 3));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm font-medium">U</span>
      </div>
      <div className="bg-white border border-gray-200 px-4 py-2 rounded-2xl rounded-bl-sm shadow-sm">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-2 h-2 bg-gray-400 rounded-full transition-all duration-300 ${
                dots.includes(i) ? "translate-y-[-50%]" : "translate-y-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}