import { useState, useRef, useEffect } from "react";
import { Message } from "../App";

type ChatWindowProps = {
  messages: Message[];
  onSend: (input: string) => void;
  isLoading: boolean;
};

export function ChatWindow({ messages, onSend, isLoading }: ChatWindowProps) {
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 border border-primary">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <p>Enter your API key and start a conversation.</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <span className="font-bold">
              {msg.role === "user" ? "You" : "AI"}:
            </span>
            <pre className="whitespace-pre-wrap">{msg.content}</pre>
          </div>
        ))}
        {isLoading && (
            <div className="mb-4">
                <span className="font-bold">AI:</span>
                <span className="blinking-cursor">_</span>
            </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex p-4 border-t border-primary">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-black border border-primary px-2 py-1 outline-none"
          placeholder="C:>"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="ml-4 px-4 py-1 border border-primary hover:bg-primary hover:text-black transition-colors"
          disabled={!input || isLoading}
        >
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </form>
    </div>
  );
}
