import { internalQuery, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
      
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      const newName = identity.name ?? identity.nickname ?? identity.email ?? "Anonymous";
      if (user.name !== newName) {
        await ctx.db.patch(user._id, { name: newName });
      }
      return user._id;
    }
    
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name ?? identity.nickname ?? identity.email?.split('@')[0] ?? "Anonymous",
      email: identity.email ?? "",
      tokenIdentifier: identity.tokenIdentifier,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });
  },
});

export const getCurrentUser = query({
    handler : async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity) {
            return null;
        }

        const user = await ctx.db.query("users").withIndex('by_token', (q) => q.eq('tokenIdentifier', identity.tokenIdentifier) ).unique();

        // Return null if user doesn't exist yet - let store() create them
        return user;
    }
})


export const incrementExportsThisMonth = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("User not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) {
      throw new Error("User does not exist");
    }

    // const currentCount = typeof user.exportsThisMonth === "number" ? user.exportsThisMonth : 0;
    // const nextCount = currentCount + 1;
    // await ctx.db.patch(user._id, {
    //   exportsThisMonth: nextCount,
    //   lastActiveAt: Date.now(),
    // });

    // return nextCount;
  },
});