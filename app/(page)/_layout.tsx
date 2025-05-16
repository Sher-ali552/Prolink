import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
    return (
        <SafeAreaProvider>
            <Tabs
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName: keyof typeof Ionicons.glyphMap = 'settings';

                        if (route.name === 'settings') {
                            iconName = 'settings';
                        } else if (route.name === 'about') {
                            iconName = 'information-circle';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                    }}
                />
                <Tabs.Screen
                    name="about"
                    options={{
                        title: 'About Us',
                    }}
                />
            </Tabs>
        </SafeAreaProvider>
    );
}
