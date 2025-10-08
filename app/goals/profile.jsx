import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";  
import { db } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [gif, setGif] = useState(null); 
  const [nickname, setNickname] = useState("");
  const [editingNickname, setEditingNickname] = useState(false);

  // Load nickname and gif from Firestore
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.nickname) setNickname(data.nickname);
          if (data.gif) setGif(data.gif);
        }
      } catch (error) {
        console.log("Error loading profile:", error);
      }
    };
    loadProfile();
  }, [user]);

  // Save nickname and gif to Firestore
  const saveProfile = async (newNickname = nickname, newGif = gif) => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { nickname: newNickname, gif: newGif }, { merge: true });
    } catch (error) {
      console.log("Error saving profile:", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  // Pick a gif or image
  const pickGif = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedGif = result.assets[0].uri;
      setGif(selectedGif);
      await saveProfile(nickname, selectedGif); // save immediately
    }
  };

  // Save nickname only
  const saveNicknameHandler = async () => {
    setEditingNickname(false);
    await saveProfile(nickname, gif);
  };

  return (
    <View style={styles.container}>
      {/* Profile Gif */}
      <TouchableOpacity onPress={pickGif}>
        <Image
          source={{ uri: gif || "https://i.pinimg.com/originals/88/f6/bb/88f6bb265a93b104a2361c16b01b845a.gif" }}
          style={styles.gif}
        />
      </TouchableOpacity>

      <Text style={styles.title}>𝒫𝓇𝑜𝒻𝒾𝓁𝑒</Text>
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
            onPress={saveNicknameHandler}
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
    backgroundColor:'#E1AFD1',
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
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: '#AD88C6',
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
    color: "#7469B6",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#7469B6",
    padding: 10,
    borderRadius: 8,
    width: "60%",
    marginBottom: 10,
    textAlign: "center",
    color: "#7469B6",
    backgroundColor: '#FFE6E6',
  },
  nickname: {
    fontSize: 16,
    marginBottom: 20,
    color: "#7469B6",
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    backgroundColor: "#AD88C6",
    borderRadius: 8,
    marginTop: 10,
  },
  editButton: {
    padding: 10,
    backgroundColor: "#7469B6",
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    padding: 10,
    backgroundColor: "#7469B6",
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFE6E6',
    fontWeight: "bold",
  },
});
