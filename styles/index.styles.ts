import { COLORS } from "@/constants/theme";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    safeArea: {
        flex: 0,
    },
    container: {
        height: 60,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        paddingHorizontal: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    searchBar: {
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        paddingLeft: 40,
        fontSize: 16,
        flex: 1,
        paddingVertical: 0,
        borderWidth: 1,
        borderColor: '#ddd',
        fontFamily: 'Arial',
    },
    icon: {
        position: 'absolute',
        left: 20,
        top: 19,
    },
    big: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    bigbold: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        color: '#333',
        lineHeight: 36,
    },
    smallbold: {
        textAlign: 'center',
        fontSize: 18,
        color: '#666',
        lineHeight: 24,
        fontFamily: 'Arial',
        marginTop: 10,
    },
    button: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "rgb(238, 0, 20)", // Corrected the color format
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        width: "60%",
        flexDirection: 'row',
    },
    arrow: {
        marginLeft: 6,
    },
    get: {
        color: "white",
    },
});
