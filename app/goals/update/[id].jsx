import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Keyboard, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useGoals } from '../../../hooks/useGoals';

const UpdateGoal = () => {
  const { id } = useLocalSearchParams();
  const { goals, updateGoal } = useGoals();
  const router = useRouter();

  const [goalText, setGoalText] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const goal = goals.find((g) => g.id === id);
    if (goal) {
      setGoalText(goal.goal);
      setDescription(goal.description || '');
    }
  }, [id, goals]);

  const handleUpdate = async () => {
    if (!goalText.trim()) return;

    await updateGoal(id, { goal: goalText, description });
      setGoalText('');
      setDescription('');
      Keyboard.dismiss();
      router.push('/goals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}>
        <Image 
          source={require('../../../assets/images/phon.gif')} 
          style={styles.gif}
          resizeMode="cover"
        />

        <Text style={styles.title}>𝑅𝑒𝒷𝓇𝑒𝓌 𝒯𝑒𝒶</Text>

        <TextInput
          style={styles.input}
          value={goalText}
          onChangeText={setGoalText}
          placeholder="Edit mood..."
          placeholderTextColor="#AD88C6"
        />

        <TextInput
          style={styles.bigInput}
          value={description}
          onChangeText={setDescription}
          placeholder="Rebrew spilled tea..."
          placeholderTextColor="#AD88C6"
          multiline
          textAlignVertical="top"
        />

        <Pressable onPress={handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateGoal;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 30, 
    paddingHorizontal: 20,
    backgroundColor: '#E1AFD1' 
  },
  gif: { 
    width: 250, 
    height: 250, 
    borderRadius: 20, 
    overflow: 'hidden', 
    marginBottom: 20, 
    alignSelf: 'center' 
  },
  title: { 
    fontSize: 24, 
    textAlign: 'center', 
    marginBottom: 20, 
    fontWeight: 'bold', 
    color: '#AD88C6' 
  },
  input: { 
    width: 300, 
    backgroundColor: '#FFE6E6', 
    padding: 20, 
    borderRadius: 8, 
    marginVertical: 10, 
    color: '#7469B6' 
  },
  bigInput: { 
    width: 300, 
    height: 150, 
    backgroundColor: '#FFE6E6', 
    padding: 20, 
    borderRadius: 8, 
    marginVertical: 10, 
    color: '#7469B6' },
  button: { 
    padding: 18, 
    backgroundColor: '#AD88C6', 
    borderRadius: 8, 
    marginTop: 10 },
  buttonText: { 
    color: '#FFE6E6', 
    fontWeight: 'bold', 
    fontSize: 16, 
    textAlign: 'center' 
  },
});
