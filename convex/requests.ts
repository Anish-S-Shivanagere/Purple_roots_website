import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const add = internalMutation({
  args: { name: v.string(), phone: v.string(), item: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("requests", {
      ...args,
      status: "new",
      submittedAt: Date.now(),
    });
  },
});
