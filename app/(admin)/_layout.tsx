import { Tabs } from 'expo-router';
import {Ionicons} from '@expo/vector-icons';
import {COLORS} from '../../constants/theme';
export default function TabLayout() {
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
            height: 45,
            padding:8,
        },
        }}
        >

            <Tabs.Screen name="index" 
            options={{ tabBarIcon: ({size,color}) => <Ionicons name="home" size={size} color={color} /> }} />
            <Tabs.Screen name="notifications" options={{ tabBarIcon: ({size,color}) => <Ionicons name="heart"
            size={size} color={color}  /> }} />
            <Tabs.Screen name="upload" options={{ tabBarIcon: ({size,color}) => <Ionicons name="add-circle-outline"
            size={size} color={color}  /> }} />
            <Tabs.Screen name="profile" options={{ tabBarIcon: ({size,color}) => <Ionicons name="person-circle"
            size={size} color={color}  /> }} />
            
        </Tabs>
    );
}
