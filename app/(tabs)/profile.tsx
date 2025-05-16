import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { styles } from '../../styles/profile.styles';
import { useAuth } from '@clerk/clerk-expo';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Redirect } from 'expo-router';
import { useRouter } from 'expo-router';
const fallbackImage = 'https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg';

const ProfileScreen = () => {
    const { signOut } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const onPressFunction = () => {
    
            router.push('/(page)/setting');
            console.log('pressed');
    };
    const convexUser = useQuery(api.getUser.getUserByClerkId, {
        clerkId: user?.id || '',
    });

    if (!user === undefined) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading profile...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: user?.imageUrl || fallbackImage }} style={styles.profileImage} />
                <View style={styles.userInfo}>
                    <Text style={styles.profileName}>
                        {user?.fullName || 'Full Name Not Available'}
                    </Text>


                    <Text style={styles.profileEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
                </View>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoText}>Password: ********</Text>
                <Text style={styles.infoText}>Mobile: 1234-123-9874</Text>
                <Text style={styles.infoText}>Address: NY- Street 21 no 34</Text>
                <Text style={styles.infoText}>Postal Code: 9871234567</Text>
                <Pressable onPress={onPressFunction}>
                    <Text>Setting</Text>
                </Pressable>

            </View>

            <TouchableOpacity onPress={() => signOut()} style={{ backgroundColor: 'black', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Sign Out</Text>


            </TouchableOpacity>

        </SafeAreaView>

    );
};

export default ProfileScreen;
