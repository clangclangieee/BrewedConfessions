import { useState } from 'react';
import { StyleSheet, Text, TextInput, Pressable, Keyboard, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGoals } from '../../hooks/useGoals';
import { useRouter } from 'expo-router';

const Create = () => {
  const [goalText, setGoalText] = useState('');
  const [description, setDescription] = useState(''); // New big input
  const { createGoal } = useGoals();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!goalText.trim()) return;

    await createGoal({
      goal: goalText,
      description,  // Save the new input
      progress: 0
    });
    setGoalText('');
    setDescription('');
    Keyboard.dismiss();
    router.push('/goals');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 50 }}>
        <Image 
          source={require('../../assets/images/panter.gif')}
          style={styles.gif}
          resizeMode="cover" 
        />

        <Text style={styles.title}>𝐵𝓇𝑒𝓌𝒾𝓃𝑔 𝒜𝓇𝑒𝒶</Text>
        
        <TextInput
          style={styles.input}
          placeholder="How are you feeling?"
          placeholderTextColor="#AD88C6"
          value={goalText}
          onChangeText={setGoalText}
        />

        <TextInput
          style={styles.bigInput}
          placeholder="Spill the tea👀"
          placeholderTextColor="#AD88C6"
          value={description}
          onChangeText={setDescription}
          multiline={true}   // Allows multiple lines
          textAlignVertical="top" // Starts text at the top
        />

        <Pressable onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Add Tea</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30, 
    paddingHorizontal: 20,
    backgroundColor: '#E1AFD1',
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
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#AD88C6',
  },
  input: {
    width: 300,
    backgroundColor: '#FFE6E6',
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    color: '#7469B6',
  },
  bigInput: {
    width: 300,
    height: 150,        // Bigger height
    backgroundColor: '#FFE6E6',
    padding: 20,
    borderRadius: 8,
    marginVertical: 10,
    color: '#7469B6',
  },
  button: {
    padding: 18,
    backgroundColor: '#AD88C6',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFE6E6',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
