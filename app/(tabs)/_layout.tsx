
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from "react";
import { COLORS } from '../../constants/theme';

import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
export default function TabLayout() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.replace("/(auth)/login");
        }
    }, [isLoaded, isSignedIn]);
    return (

    
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.grey,
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    position: "absolute",
                    elevation: 0,
                    height: 40,
                    padding: 8,
                },
            }}
        >

            <Tabs.Screen name="index"
                options={{ tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={COLORS.primary} /> }} />
            <Tabs.Screen name="AddItemForm"
                options={{
                    tabBarIcon: ({ size, color }) => <Ionicons name="heart"
                        size={size} color={color} />
                }} />
            <Tabs.Screen name="profile" options={{
                tabBarIcon: ({ size, color }) => <Ionicons name="person-circle"
                    size={size} color={color} />
            }} />

        </Tabs>
    
    );
}
