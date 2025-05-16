import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
    users: defineTable({
        username: v.string(),
        email: v.string(),
        image: v.string(),
        fullname: v.string(),
        // password: v.string(),
        clerkId: v.string(),
    }).index('by_clerk_id', ['clerkId']),


        // inventory: defineTable({
        //     itemname: v.string(),
        //     // itemtype: v.string(),
        //     // location: v.string(),
        //     itemtype: v.optional(v.string()),
        //     location: v.optional(v.string()),
        //     image: v.optional(v.id('_storage')),
        //     qr_code: v.id('_storage'), // Required since addItem generates and stores a QR code
        // }),
        
        inventory: defineTable({
            itemname: v.string(),
    type: v.optional(v.string()),
    location: v.optional(v.string()), // optional
    imageId: v.optional(v.id('_storage')), // store file ID, not full URL
        }),
});