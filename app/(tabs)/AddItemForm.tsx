// import { useMutation } from "convex/react";
// import React, { useState } from "react";
// import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import { api } from "../.././convex/_generated/api";
// // Optional: For file picking, install react-native-image-picker
// import * as ImagePicker from "expo-image-picker";

// type FileType = {
//     uri: string;
//     type?: string;
//     name?: string;
// } | null;

// const AddItemForm = () => {
//     const [itemname, setItemName] = useState("");
//     const [type, setType] = useState("");
//     const [location, setLocation] = useState("");
//     const [file, setFile] = useState<FileType>(null);

//     // Use individual mutations
//     const generateUploadUrl = useMutation(api.AddItem.generateUploadUrl);
//     const addItem = useMutation(api.AddItem.addItem);

//     const handleSubmit = async () => {
//         if (!itemname) {
//             Alert.alert("Error", "Item Name is required");
//             return;
//         }

//         let imageId = undefined;

//         if (file && file.uri) {
//             try {
//                 const uploadUrl = await generateUploadUrl();
//                 // Create FormData for file upload
//                 const formData = new FormData();
//             formData.append("file", {
//     uri: file.uri,
//     name: file.name || "image.jpg",
//     type: file.type || "image/jpeg",
// } as any); // bypass type issue for React Native


//                 const response = await fetch(uploadUrl, {
//                     method: "POST",
//                     body: formData,
//                     headers: {
//                         // FormData sets Content-Type automatically
//                         Accept: "application/json",
//                     },
//                 });

//                 if (!response.ok) {
//                     Alert.alert("Error", "Failed to upload image");
//                     return;
//                 }

//                 const { storageId } = await response.json();
//                 imageId = storageId;
//             } catch (err) {
//                 console.error("Image upload error:", err);
//                 Alert.alert("Error", "Failed to upload image");
//                 return;
//             }
//         }

//         try {
//             await addItem({ itemname, type, location, imageId });
//             Alert.alert("Success", "Item added successfully");
//             setItemName("");
//             setType("");
//             setLocation("");
//             setFile(null);
//         } catch (err) {
//             console.error("Add item error:", err);
//             Alert.alert("Error", "Failed to add item");
//         }
//     };

// const pickImage = async () => {
//     try {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             quality: 1,
//         });

//         if (!result.canceled && result.assets && result.assets.length > 0) {
//             const asset = result.assets[0];
//             setFile({
//                 uri: asset.uri,
//                 type: asset.type ?? "image/jpeg",
//                 name: asset.fileName ?? "image.jpg",
//             });
//         }
//     } catch (err) {
//         console.error("Image picker error:", err);
//         Alert.alert("Error", "Failed to pick image");
//     }
// };


//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Add New Item</Text>
//             <TextInput
//                 style={styles.input}
//                 value={itemname}
//                 onChangeText={setItemName}
//                 placeholder="Item Name"
//                 placeholderTextColor="#999"
//             />
//             <TextInput
//                 style={styles.input}
//                 value={type}
//                 onChangeText={setType}
//                 placeholder="Type (optional)"
//                 placeholderTextColor="#999"
//             />
//             <TextInput
//                 style={styles.input}
//                 value={location}
//                 onChangeText={setLocation}
//                 placeholder="Location (optional)"
//                 placeholderTextColor="#999"
//             />
//             <TouchableOpacity style={styles.fileButton} onPress={pickImage}>
//                 <Text style={styles.fileButtonText}>
//                     {file ? "Image Selected" : "Pick an Image"}
//                 </Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                 <Text style={styles.submitButtonText}>Add Item</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         maxWidth: 400,
//         width: "100%",
//         alignSelf: "center",
//         flexDirection: "column",
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: "600",
//         marginBottom: 8,
//     },
//     input: {
//         width: "100%",
//         padding: 8,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 4,
//         marginBottom: 16,
//         fontSize: 16,
//     },
//     fileButton: {
//         padding: 8,
//         borderWidth: 1,
//         borderColor: "#ccc",
//         borderRadius: 4,
//         alignItems: "center",
//         marginBottom: 16,
//     },
//     fileButtonText: {
//         fontSize: 16,
//         color: "#333",
//     },
//     submitButton: {
//         backgroundColor: "#3b82f6",
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 4,
//         alignItems: "center",
//     },
//     submitButtonText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "500",
//     },
// });

// export default AddItemForm;



import { useMutation } from "convex/react";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

type FileType = {
    uri: string;
    type?: string;
    name?: string;
} | null;

const AddItemForm = () => {
    const [itemname, setItemName] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [file, setFile] = useState<FileType>(null);

    const generateUploadUrl = useMutation(api.inventory.generateUploadUrl);
    const addItem = useMutation(api.inventory.addItem);

    const handleSubmit = async () => {
        console.log("handleSubmit called with:", { itemname, type, location, file });

        if (!itemname.trim()) {
            Alert.alert("Validation Error", "Item Name is required");
            return;
        }

        let imageId: Id<"_storage"> | undefined = undefined;

        if (file && file.uri) {
            try {
                const uploadUrl = await generateUploadUrl();
                const formData = new FormData();
                formData.append("file", {
                    uri: file.uri,
                    name: file.name || "image.jpg",
                    type: file.type || "image/jpeg",
                } as any);

                const response = await fetch(uploadUrl, {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Upload failed:", errorText);
                    Alert.alert("Upload Error", "Failed to upload image");
                    return;
                }

                const data = await response.json();
                imageId = data.storageId as Id<"_storage">;
                console.log("Image uploaded, storageId:", imageId);
            } catch (error) {
                console.error("Image upload error:", error);
                Alert.alert("Upload Error", "Failed to upload image");
                return;
            }
        }

        try {
            const result = await addItem({
                itemname,
                type: type.trim() || undefined,
                location: location.trim() || undefined,
                imageId,
            });
            console.log("addItem result:", result);
            Alert.alert("Success", "Item added successfully");
            setItemName("");
            setType("");
            setLocation("");
            setFile(null);
        } catch (error) {
            console.error("Add item error:", error);
            Alert.alert("Submission Error", "Failed to add item");
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                const asset = result.assets[0];
                setFile({
                    uri: asset.uri,
                    type: asset.type ?? "image/jpeg",
                    name: asset.fileName ?? "image.jpg",
                });
            }
        } catch (error) {
            console.error("Image picker error:", error);
            Alert.alert("Error", "Failed to pick image");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Item</Text>
            <TextInput
                style={styles.input}
                value={itemname}
                onChangeText={setItemName}
                placeholder="Item Name"
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                value={type}
                onChangeText={setType}
                placeholder="Type (optional)"
                placeholderTextColor="#999"
            />
            <TextInput
                style={styles.input}
                value={location}
                onChangeText={setLocation}
                placeholder="Location (optional)"
                placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.fileButton} onPress={pickImage}>
                <Text style={styles.fileButtonText}>{file ? "Image Selected" : "Pick an Image"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Add Item</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        maxWidth: 400,
        width: "100%",
        alignSelf: "center",
        flexDirection: "column",
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        width: "100%",
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        marginBottom: 16,
        fontSize: 16,
    },
    fileButton: {
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        alignItems: "center",
        marginBottom: 16,
    },
    fileButtonText: {
        fontSize: 16,
        color: "#333",
    },
    submitButton: {
        backgroundColor: "#3b82f6",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
});

export default AddItemForm;
