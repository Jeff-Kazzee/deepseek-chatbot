import { v } from "convex/values";
import { action, mutation } from "./_generated/server";
import OpenAI from "openai";

export const getAIResponse = action({
  args: {
    messages: v.array(
      v.object({
        role: v.string(),
        content: v.string(),
      }),
    ),
    model: v.union(
      v.literal("deepseek/deepseek-r1-0528:free"),
      v.literal("tngtech/deepseek-r1t-chimera:free"),
    ),
    apiKey: v.string(),
  },
  handler: async (_, args) => {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: args.apiKey,
    });

    const stream = await openai.chat.completions.create({
      model: args.model,
      messages: args.messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      stream: true,
    });

    let content = "";
    for await (const part of stream) {
      content += part.choices[0]?.delta?.content ?? "";
    }
    return content;
  },
});

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
    if (existing) {
      return;
    }
    await ctx.db.insert("subscribers", { email: args.email });
  },
});
