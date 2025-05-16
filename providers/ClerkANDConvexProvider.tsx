// import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
// import { tokenCache } from '@clerk/clerk-expo/token-cache';
// import { ConvexReactClient } from 'convex/react';
// import { ConvexProviderWithClerk } from 'convex/react-clerk';
// import React from 'react';
// const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
// if(!publishableKey){
//     throw new Error("Missing CLERK_PUBLISHABLE_KEY")
// }

// const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!)

// export default  function ClerkANDConvexProvider ({children}:{children :React.ReactNode})  {
// return(
//     <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
//         <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        
//             <ClerkLoaded>{children}</ClerkLoaded>
//         </ConvexProviderWithClerk>
//     </ClerkProvider>
// )
// }

// providers/ClerkANDConvexProvider.tsx
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { ReactNode } from 'react';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
}

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

function ConvexWithClerkAuth({ children, client }: { children: ReactNode; client: ConvexReactClient }) {
    const auth = useAuth();
    return (
        <ConvexProviderWithClerk client={client} useAuth={() => auth}>
            {children}
        </ConvexProviderWithClerk>
    );
}

export default function ClerkANDConvexProvider({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ClerkLoaded>
                <ConvexWithClerkAuth client={convex}>{children}</ConvexWithClerkAuth>
            </ClerkLoaded>
        </ClerkProvider>
    );
}

