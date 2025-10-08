import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Sign out right after creating the account
    await auth.signOut();
    // Redirect to login page instead of home
    router.replace("/login");
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/flowt.gif")}
        style={styles.gif}
        resizeMode="cover"
      />

      <Text style={styles.title}>Sign Up</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#7469B6"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#7469B6"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: '#E1AFD1', 
  },
  gif: {
    width: 230,
    height: 230,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 20,
    color: '#AD88C6',
    textAlign: "center",
  },
  input: {
    width: "80%",
    backgroundColor: '#FFE6E6',
    borderWidth: 1,
    borderColor: '#7469B6',
    padding: 14,
    marginVertical: 8,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#AD88C6',
    paddingVertical: 14,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    shadowColor: '#AD88C6',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#FFE6E6",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    color: "#7469B6",
    fontSize: 15,
    fontWeight: "600",
  },
  error: {
    color: "#7469B6",
    marginBottom: 10,
    textAlign: "center",
  },
});
