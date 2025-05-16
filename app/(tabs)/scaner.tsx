import { View, Text, StyleSheet, TouchableOpacity, Modal, Linking, Animated } from "react-native";
import { useState, useRef, useEffect } from "react";
import { CameraView, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { styles } from '../../styles/scan.styles';


const QRCodeScanner = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [barcodeResult, setBarcodeResult] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);
    const scanLineAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        (async () => {
            if (permission === null) {
                const { granted } = await requestPermission();
                if (!granted) {
                    alert("Camera permission is required to scan QR codes.");
                }
            }
        })();

        // Start scan line animation
        Animated.loop(
            Animated.timing(scanLineAnim, {
                toValue: 280, // Height of qrBox
                duration: 2000,
                useNativeDriver: true,
            })
        ).start();

        return () => scanLineAnim.setValue(0); // Reset animation on unmount
    }, [permission, requestPermission, scanLineAnim]);

    const handleBarcodeScanned = ({ data }: BarcodeScanningResult) => {
        setBarcodeResult(data);
    };

    if (!permission) {
        return <View style={styles.container} />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Camera permission required</Text>
                <TouchableOpacity style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="back"
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={handleBarcodeScanned}
            >
                <View style={styles.overlay}>
                    <View style={styles.qrBox}>
                        <View style={[styles.qrCorner, styles.topLeft]} />
                        <View style={[styles.qrCorner, styles.topRight]} />
                        <View style={[styles.qrCorner, styles.bottomLeft]} />
                        <View style={[styles.qrCorner, styles.bottomRight]} />
                        <Animated.View
                            style={[
                                styles.scanLine,
                                { transform: [{ translateY: scanLineAnim }] },
                            ]}
                        />
                    </View>
                </View>
            </CameraView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={!!barcodeResult}
                onRequestClose={() => setBarcodeResult(null)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>QR Code Detected</Text>
                    <Text style={styles.barcodeText}>{barcodeResult}</Text>

                    {barcodeResult?.startsWith("http") && (
                        <TouchableOpacity
                            style={[styles.button, styles.buttonOpen]}
                            onPress={() => Linking.openURL(barcodeResult)}
                        >
                            <Text style={styles.buttonText}>Open in Browser</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setBarcodeResult(null)}
                    >
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};
export default QRCodeScanner;