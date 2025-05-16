import { StatusBar } from "react-native";

import ClerkANDConvexProvider from "@/providers/ClerkANDConvexProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from '../components/InitialLayout';


export default function RootLayout() {
    return (
    <ClerkANDConvexProvider>
        <SafeAreaProvider>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <SafeAreaView style={{ flex: 1 }}>
            <InitialLayout />
            </SafeAreaView>
        </SafeAreaProvider>
        </ClerkANDConvexProvider>
    );
}
