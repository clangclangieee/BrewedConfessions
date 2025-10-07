import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Keyboard, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useGoals } from "../../../hooks/useGoals";

const UpdateGoal = () => {
  const { id } = useLocalSearchParams(); 
  const { goals, updateGoal } = useGoals();
  const router = useRouter();

  const [goalText, setGoalText] = useState("");


  useEffect(() => {
    const goal = goals.find((g) => g.id === id);
    if (goal) setGoalText(goal.goal);
  }, [id, goals]);

  const handleUpdate = async () => {
    if (goalText.trim() === "") return;

    await updateGoal(id, { goal: goalText });
    Keyboard.dismiss();
    router.push("/goals"); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require("../../../assets/images/panter.gif")} 
        style={styles.gif}
        resizeMode="cover"
      />

      <Text style={styles.title}>Update Song</Text>

      <TextInput
        style={styles.input}
        value={goalText}
        onChangeText={setGoalText}
        placeholder="Edit your song"
        placeholderTextColor="#AD88C6"
      />

      <Pressable onPress={handleUpdate} style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default UpdateGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E1AFD1",
    padding: 20,
  },
 gif: {
    width: 250,       
    height: 250,      
    borderRadius: 20, 
    overflow: 'hidden',
    marginBottom: 30, 
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: '#AD88C6',
  },
  input: {
    width: 300,
    backgroundColor: "#FFE6E6",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    color: "#7469B6",
  },
  button: {
    backgroundColor: "#AD88C6",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFE6E6",
    fontWeight: "bold",
    fontSize: 16,
  },
});
