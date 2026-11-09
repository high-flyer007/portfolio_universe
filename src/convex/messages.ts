import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const OWNER_EMAIL = "m.alipathan2905@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Stores a contact message from the portfolio. This is a real write to the
 * Convex deployment — the UI only reports success after this resolves.
 */
export const send = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    intent: v.string(),
    message: v.string(),
  },
  returns: v.object({
    receivedAt: v.number(),
  }),
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();
    const intent = args.intent.trim();
    const message = args.message.trim();

    if (name.length < 2 || name.length > 80) {
      throw new Error("Please enter a name between 2 and 80 characters.");
    }
    if (!EMAIL_PATTERN.test(email) || email.length > 160) {
      throw new Error("Please enter a valid email address.");
    }
    if (!intent || intent.length > 48) {
      throw new Error("Please choose a conversation topic.");
    }
    if (message.length < 12 || message.length > 2000) {
      throw new Error("Please write a message between 12 and 2000 characters.");
    }

    const now = Date.now();
    const recent = await ctx.db
      .query("messages")
      .withIndex("by_email", (q) => q.eq("email", email))
      .take(20);

    if (recent.some((entry) => now - entry.createdAt < 60_000)) {
      throw new Error(
        "A message from this address was just received. Please wait a minute before sending another.",
      );
    }

    await ctx.db.insert("messages", {
      name,
      email,
      intent,
      message,
      createdAt: now,
    });

    return { receivedAt: now };
  },
});

/**
 * Private inbox for the site owner. Returns `authorized: false` rather than
 * throwing so the studio page can explain the state without a runtime error.
 */
export const listForOwner = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const email = identity?.email?.trim().toLowerCase();
    if (!identity || email !== OWNER_EMAIL) {
      return { authorized: false as const, messages: [] };
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_created")
      .order("desc")
      .take(100);

    return { authorized: true as const, messages };
  },
});
