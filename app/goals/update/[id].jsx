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
        source={require("../../../assets/images/know.gif")} 
        style={styles.gif}
        resizeMode="cover"
      />

      <Text style={styles.title}>Update Goal</Text>

      <TextInput
        style={styles.input}
        value={goalText}
        onChangeText={setGoalText}
        placeholder="Edit your goal"
        placeholderTextColor="#fff"
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
    backgroundColor: "#D6CADD",
    padding: 20,
  },
  gif: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#9F2B68",
  },
  input: {
    width: 300,
    backgroundColor: "#BE93E4",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    color: "#fff",
  },
  button: {
    backgroundColor: "#9F2B68",
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
