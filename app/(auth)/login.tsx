import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { styles } from '../../styles/auth.styles'
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import React from 'react';
import { useSSO } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useRoute } from '@react-navigation/native';

export default function Login() {
    const { startSSOFlow } = useSSO();
    // const route = useRoute();

    const handleGoogleSignIn = async () => {
        // Handle Google Sign-In logic here
        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy: "oauth_google" })

            if (setActive && createdSessionId) {
                await setActive({ session: createdSessionId })
                router.replace('/(tabs)'); // Use router.replace instead
                console.log('Successfully signed in');
            }
            else {
                console.error('Google Sign-In failed: No session created');
            }
        }
        catch (error) {
            console.log("SSO Auth error", error);
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.brandSection}>
                <View style={styles.logoContainer}>
                    <Ionicons name="logo-react" size={32} color={COLORS.primary} />
                </View>
                <Text style={styles.appName}>ProLink</Text>
                <Text style={styles.tagline}>don't miss anything</Text>
            </View>

            {/* LOGIN SECTION */}
            <View style={styles.loginSection}>
                <TouchableOpacity
                    style={styles.googleButton}
                    activeOpacity={0.9}
                    onPress={handleGoogleSignIn}
                >
                    <View style={styles.googleIconContainer}>
                        <Ionicons name="logo-google" size={20} color={COLORS.surface} />
                        <Text style={styles.googleButtonText}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.termsText}>By continuing up you agree to our terms and conditions.</Text>
            </View>
        </View>
    );
}
