import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';

const createTokenCache = (): TokenCache => {
    if (Platform.OS === 'web') {
        return {
            getToken: async (key: string) => {
                try {
                    const item = localStorage.getItem(key);
                    if (item) {
                        console.log(`${key} was retrieved from localStorage 🔐`);
                    } else {
                        console.log(`No value stored under key in localStorage: ${key}`);
                    }
                    return item;
                } catch (error) {
                    console.error('localStorage get item error: ', error);
                    return null;
                }
            },
            saveToken: async (key: string, token: string) => {
                try {
                    localStorage.setItem(key, token);
                    console.log(`${key} was saved to localStorage 🔐`);
                } catch (error) {
                    console.error('localStorage set item error: ', error);
                }
            },
        };
    }

    return {
        getToken: async (key: string) => {
            try {
                const item = await SecureStore.getItemAsync(key);
                if (item) {
                    console.log(`${key} was retrieved from SecureStore 🔐`);
                } else {
                    console.log(`No value stored under key in SecureStore: ${key}`);
                }
                return item;
            } catch (error) {
                console.error('SecureStore get item error: ', error);
                await SecureStore.deleteItemAsync(key).catch((deleteError) => {
                    console.error('SecureStore delete item error: ', deleteError);
                });
                return null;
            }
        },
        saveToken: async (key: string, token: string) => {
            try {
                await SecureStore.setItemAsync(key, token);
                console.log(`${key} was saved to SecureStore 🔐`);
            } catch (error) {
                console.error('SecureStore set item error: ', error);
            }
        },
    };
};

export default createTokenCache();