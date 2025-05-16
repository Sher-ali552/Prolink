import { useAuth } from '@clerk/clerk-expo';
import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
export default function InitialLayout ()  {
const {isLoaded, isSignedIn} = useAuth();

const segments =useSegments();
const router = useRouter();
useEffect(() => {
    if (!isLoaded) return

    const inAuthScreen = segments[0] === '(auth)'

    if (!isSignedIn && !inAuthScreen)  router.replace('/(auth)/login')
        else if(isSignedIn && inAuthScreen) router.replace('/(tabs)')
}, [isLoaded, isSignedIn, segments]);

if(!isLoaded) return null;
return <Stack screenOptions={{headerShown:false}} />;

}


// import { Stack, useRouter, useSegments } from 'expo-router';
// import React, { useEffect, useState } from 'react';

// export default function InitialLayout() {
//     const segments = useSegments();
//     const router = useRouter();
//     const [checked, setChecked] = useState(false);

//     useEffect(() => {
//         const checkAuth = async () => {
//             const { useAuth } = await import('@clerk/clerk-expo');
//             const { isLoaded, isSignedIn } = useAuth();

//             if (!isLoaded) return;

//             const inAuthGroup = segments[0] === '(auth)';

//             if (!isSignedIn && !inAuthGroup) {
//                 router.replace('/(auth)/login');
//             } else if (isSignedIn && inAuthGroup) {
//                 router.replace('/(tabs)');
//             }

//             setChecked(true);
//         };

//         checkAuth();
//     }, [segments]);

//     if (!checked) return null;

//     return <Stack screenOptions={{ headerShown: false }} />;
// }

// // components/InitialLayout.tsx
