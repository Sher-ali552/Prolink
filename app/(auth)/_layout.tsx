

// import ClerkANDConvexProvider from "@/providers/ClerkANDConvexProvider";
// import { useAuth } from '@clerk/clerk-expo';
// import { Redirect, Stack } from 'expo-router';
// import { SafeAreaProvider } from "react-native-safe-area-context";
// export default function AuthLayout() {
//     const { isSignedIn } = useAuth()

//     if (isSignedIn) {
//         return <Redirect href={'/'} />
//     }

//     return (

//             <SafeAreaProvider>
//                 <Stack />
//             </SafeAreaProvider>

//     );
// }


// app/(auth)/_layout.tsx
import { useAuth } from '@clerk/clerk-expo';
import { Redirect, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AuthLayout() {
    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <Redirect href={'/'} />;
    }

    return (
    
            <SafeAreaProvider>
                <Stack />
            </SafeAreaProvider>
        
    );
}
