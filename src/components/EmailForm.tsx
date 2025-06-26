import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const subscribe = useMutation(api.chat.subscribe);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribe({ email });
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-black border border-primary px-2 py-1 outline-none text-sm"
        placeholder="Optional: Subscribe for updates"
      />
      <button
        type="submit"
        className="px-3 py-1 border border-primary text-sm hover:bg-primary hover:text-black transition-colors"
        disabled={!email}
      >
        Submit
      </button>
    </form>
  );
}
