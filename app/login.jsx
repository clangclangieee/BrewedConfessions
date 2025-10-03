import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/"); // ✅ redirect to Home (index.jsx)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
        <Image 
            source={require('../assets/images/hyunie.gif')}
            style={styles.gif}
            resizeMode="cover" 
        />
        <Text style={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.link}>Don’t have an account? Sign up</Text>
        </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20, 
        backgroundColor: "#D6CADD",
    },
    gif: {
        width: 250,
        height: 250,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20,
        alignSelf: 'center', 
    },
    title: { 
        fontSize: 28, 
        fontWeight: "bold", 
        marginBottom: 20, 
        color: '#9F2B68',
    },
    input: { 
        width: "25%", 
        borderWidth: 1, 
        padding: 12, 
        marginVertical: 8, 
        borderRadius: 8, 
        color: '#fff',
    },
    button: { 
        backgroundColor: "#9F2B68", 
        padding: 15, 
        borderRadius: 8, 
        width: "15%", 
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: { 
        color: "white", 
        fontWeight: "bold" 
    },
    link: { 
        marginTop: 15, 
        color: "#9F2B68" 
    },
    error: { 
        color: "red", 
        marginBottom: 10 
    },
    });
