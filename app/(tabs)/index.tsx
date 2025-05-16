import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import 'react-native-gesture-handler';
import { styles } from '../../styles/index.styles'
import { MaterialIcons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { Link } from 'expo-router'
export default function index() {
  const arrowPosition = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  useEffect(() => {
    // Animate the arrow position continuously
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowPosition, {
          toValue: 12,// Move the arrow 20px to the right
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(arrowPosition, {
          toValue: 0, // Reset to original position
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  const handleLinkPress = () => {
    router.push('../LoginScreen'); // Navigate to profile screen
    // router.push('../scan');
  };
  return (
    <View style={styles.container1}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search images..."
          />
          <MaterialIcons
            name="search"
            size={24}
            color="gray"
            style={styles.icon}
          />
        </View>
      </SafeAreaView>

      <View style={styles.big}>
        <Text style={styles.bigbold}>
          Your life's work,{"\n"} powered by our life's work
        </Text>
        <Text style={styles.smallbold}>
          A unique and powerful software suite to transform the way
          you work.{"\n"} Designed for businesses of all sizes,{"\n"}
          built by a company that values your privacy.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleLinkPress}>

          <Text style={styles.get}>GET STARTED FOR FREE</Text>
          <Animated.View style={[styles.arrow, { transform: [{ translateX: arrowPosition }] }]}>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </Animated.View>
        </TouchableOpacity>
      
      </View>
    </View>
  );
}

