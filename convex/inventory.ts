// import { v } from 'convex/values';
// import { mutation } from "./_generated/server";
// export const generateUploadUrl = mutation({
//     handler: async (ctx) => {
//         return await ctx.storage.generateUploadUrl();
//     },
// });


// export const addItem = mutation({
//     args: {
//         itemname: v.string(),
//         type: v.optional(v.string()),
//         location: v.optional(v.string()), // optional
//         imageId: v.optional(v.id('_storage')), // store file ID, not full URL
//     },
//     handler: async (ctx, args) => {

//         if (args.imageId) {
//             const imageURL = await ctx.storage.getUrl(args.imageId);
//             if (!imageURL) {
//                 throw new Error("Image not found");
//             }
//         }
//         //create insert query
//         await ctx.db.insert("inventory", {
//             itemname: args.itemname,

//             type: args.type,

//             location: args.location,
//             imageId: args.imageId,
//         })
//         // return await ctx.storage.generateUploadUrl();
//         return "Item added successfully";
//     },
// })


// import { v } from "convex/values";
// import { mutation, query } from "./_generated/server";

// // Mutation to get upload URL (requires authentication)
// export const generateUploadUrl = mutation({
//     handler: async (ctx) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) throw new Error("Unauthorized");
//         return await ctx.storage.generateUploadUrl();
//     },
// });

// // Mutation to insert a new item
// export const addItem = mutation({
//     args: {
//         itemname: v.string(),
//         type: v.optional(v.string()),
//         location: v.optional(v.string()),
//         imageId: v.optional(v.id("_storage")),
//     },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) throw new Error("Unauthorized");

//         const currentUser = await ctx.db
//             .query("users")
//             .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
//             .first();

//         if (!currentUser) {
//             throw new Error("Unauthorized");
//         }

//         console.log("addItem mutation called with args:", args);

//         if (args.imageId) {
//             const imageURL = await ctx.storage.getUrl(args.imageId);
//             if (!imageURL) throw new Error("Invalid image ID");
//         }

//         const id = await ctx.db.insert("inventory", {
//             itemname: args.itemname,
//             type: args.type,
//             location: args.location,
//             imageId: args.imageId,
//         });

//         console.log("Item inserted with ID:", id);
//         return id;
//     },
// });

// // Query to list all items (no auth required unless you want to add it)
// export const listItems = query(async (ctx) => {
//     return await ctx.db.query("inventory").collect();
// });



import { v } from "convex/values";
import { action, mutation } from "./_generated/server";

// Get a secure upload URL for uploading a file
export const generateUploadUrl = action(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

// Add a new item to the inventory
export const addItem = mutation({
    args: {
        itemname: v.string(),
        type: v.optional(v.string()),
        location: v.optional(v.string()),
        imageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (!currentUser) throw new Error("Unauthorized - no user found");

        const id = await ctx.db.insert("inventory", {
            itemname: args.itemname,
            type: args.type,
            location: args.location,
            imageId: args.imageId, // store file ID, not full URL
        });

        return id;
    },
});
