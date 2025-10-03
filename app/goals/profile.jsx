import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";  

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [gif, setGif] = useState(null); 
  const [nickname, setNickname] = useState("CARAMEL");
  const [editingNickname, setEditingNickname] = useState(false);


  const handleLogout = async () => {
    await logout();
    router.replace("/login"); // 
  };

  // Pick a gif or image
  const pickGif = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // includes gifs
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setGif(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Gif */}
      <TouchableOpacity onPress={pickGif}>
        <Image
          source={{ uri: gif || "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" }}
          style={styles.gif}
        />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      <Text style={styles.email}>Logged in as: {user?.email}</Text>

      {/* Nickname */}
      {editingNickname ? (
        <>
          <TextInput
            style={styles.input}
            value={nickname}
            onChangeText={setNickname}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setEditingNickname(false)}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.nickname}>Nickname: {nickname}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditingNickname(true)}
          >
            <Text style={styles.buttonText}>Edit Nickname</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D6CADD",
    padding: 20,
  },
  gif: {
    width: 250,
    height: 250,
    borderRadius: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#9F2B68",
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
    color: "#9F2B68",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    width: "25%",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
    backgroundColor: "white",
  },
  nickname: {
    fontSize: 16,
    marginBottom: 20,
    color: "#9F2B68",
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    backgroundColor: "#BE93E4",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
