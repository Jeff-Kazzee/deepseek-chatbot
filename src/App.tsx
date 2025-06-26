import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import { ChatWindow } from "./components/ChatWindow";
import { Settings } from "./components/Settings";
import { EmailForm } from "./components/EmailForm";
import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export type Model = "deepseek/deepseek-r1-0528:free" | "tngtech/deepseek-r1t-chimera:free";

export default function App() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState<Model>("deepseek/deepseek-r1-0528:free");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAIResponse = useAction(api.chat.getAIResponse);

  useEffect(() => {
    const storedApiKey = localStorage.getItem("openrouter_api_key");
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleSendMessage = async (input: string) => {
    if (!apiKey) {
      toast.error("Please enter your OpenRouter API key in the settings.");
      return;
    }
    if (!input.trim()) return;

    setIsLoading(true);
    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);

    try {
      const responseContent = await getAIResponse({
        messages: newMessages,
        model,
        apiKey,
      });
      setMessages([
        ...newMessages,
        { role: "assistant", content: responseContent },
      ]);
    } catch (error) {
      toast.error("Failed to get response from AI. Check your API key and model selection.");
      console.error(error);
      // remove the user message if the API call fails
      setMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-primary font-mono">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm h-16 flex justify-between items-center border-b border-primary px-4">
        <h2 className="text-xl font-semibold">
          {'C:>DEEPSEEK.EXE'}
          <span className="blinking-cursor">_</span>
        </h2>
        <EmailForm />
      </header>
      <main className="flex-1 flex p-4 gap-4">
        <div className="w-1/4 border-r border-primary pr-4">
          <Settings
            apiKey={apiKey}
            setApiKey={setApiKey}
            model={model}
            setModel={setModel}
            onNewChat={handleNewChat}
          />
        </div>
        <div className="w-3/4">
          <ChatWindow
            messages={messages}
            onSend={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </main>
      <footer className="border-t border-primary px-4 py-3 text-xs text-secondary text-center">
        <p>
          🔒 We do not save any chat data or personal information. You're chatting with free AI models. 
          Email subscription is optional for future project updates only.
        </p>
        <p className="mt-2">
          Built by <span className="text-primary">Jeff Kazzee</span> • Open Source DeepSeek Chat Interface
        </p>
      </footer>
      <Toaster />
    </div>
  );
}
