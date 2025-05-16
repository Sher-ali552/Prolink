import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Create a new task with the given text
export const createUser = mutation({
args:{
    username: v.string(),
    email: v.string(),
    image: v.string(),
    fullname: v.string(),
    clerkId: v.string(),

},
handler : async (ctx,args) => {
    const existingUser = await ctx.db.query("users")
    .withIndex("by_clerk_id",(q)=> q.eq("clerkId",args.clerkId))
    .first();
    
    if(existingUser) return;
    
    //create a new user
    await ctx.db.insert("users",{
        username: args.username,
        email: args.email,
        image: args.image,
        fullname: args.fullname,
        clerkId: args.clerkId,
        
});
}
});