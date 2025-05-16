import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9'
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 20,
        marginTop: -40, // <<< this makes it overlap
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5, // for Android shadow
    },

    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },

    header: {
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        height: 100,
        justifyContent: 'center',
        backgroundColor: '#4F87A1',
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    profileContainer: {
        alignItems: 'center',
        marginVertical: 30,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFFFFF',
        marginBottom: 15,
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333'
    },
    profileEmail: {
        fontSize: 16,
        color: '#666',
        marginTop: 5
    },
    viewProfileButton: {
        backgroundColor: '#E2E8F0',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
    },
    viewProfileText: {
        fontSize: 16,
        color: '#4F87A1',
        fontWeight: '500'
    },
    optionsContainer: {
        marginHorizontal: 20,
        marginTop: 10
    },
    optionItem: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionText: {
        fontSize: 18,
        color: '#333'
    },
    logoutButton: {
        backgroundColor: '#F56565',
        alignItems: 'center'
    },
    logoutText: {
        color: '#FFFFFF',
        fontWeight: '600'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
    }
});
