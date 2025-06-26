import { toast } from "sonner";
import { Model } from "../App";

type SettingsProps = {
  apiKey: string;
  setApiKey: (key: string) => void;
  model: Model;
  setModel: (model: Model) => void;
  onNewChat: () => void;
};

export function Settings({
  apiKey,
  setApiKey,
  model,
  setModel,
  onNewChat,
}: SettingsProps) {
  const handleSaveApiKey = () => {
    localStorage.setItem("openrouter_api_key", apiKey);
    toast.success("API Key saved to local storage.");
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Settings</h3>
        <button
          className="w-full px-4 py-2 rounded-none border border-primary hover:bg-primary hover:text-black transition-colors"
          onClick={onNewChat}
        >
          + New Chat
        </button>
      </div>
      <div>
        <label htmlFor="apiKey" className="block mb-1 text-secondary">
          OpenRouter API Key
        </label>
        <input
          id="apiKey"
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full bg-black border border-primary px-2 py-1 outline-none"
          placeholder="sk-or-..."
        />
        <button
          onClick={handleSaveApiKey}
          className="w-full mt-2 px-4 py-1 border border-primary text-xs hover:bg-primary hover:text-black transition-colors"
        >
          Save Key
        </button>
        <a
          href="https://openrouter.ai/keys"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-secondary hover:text-primary mt-1 block text-center"
        >
          Get an API key from OpenRouter
        </a>
      </div>
      <div>
        <label htmlFor="model" className="block mb-1 text-secondary">
          Model
        </label>
        <select
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value as Model)}
          className="w-full bg-black border border-primary px-2 py-1 outline-none"
        >
          <option value="deepseek/deepseek-r1-0528:free">DeepSeek R1 (Free)</option>
          <option value="tngtech/deepseek-r1t-chimera:free">DeepSeek R1T Chimera (Free)</option>
        </select>
      </div>
    </div>
  );
}
