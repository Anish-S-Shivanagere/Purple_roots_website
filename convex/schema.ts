import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  requests: defineTable({
    name: v.string(),
    phone: v.string(),
    item: v.string(),
    details: v.optional(v.string()),
    status: v.string(), // "new" | "called"
    submittedAt: v.optional(v.number()),
  }),
});
