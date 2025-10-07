import { useState } from 'react'
import { StyleSheet, Text, TextInput, Pressable, Keyboard, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGoals } from '../../hooks/useGoals'
import { useRouter } from 'expo-router'

const Create = () => {
  const [goal, setGoal] = useState('')
  const { createGoal } = useGoals()
  const router = useRouter()
 
  const handleSubmit = async () => {
    await createGoal({
      goal,
      progress:0
    })
    setGoal('')
    Keyboard.dismiss()
    router.push('/goals')

  }

  return (
    <SafeAreaView style={styles.container}>
       <Image 
        source={require('../../assets/images/phon.gif')}
        style={styles.gif}
        resizeMode="cover" 
      />
<<<<<<< HEAD
      <Text style={styles.title}>Add a Song</Text>
=======
      <Text style={styles.title}>Create a New Gol</Text>
>>>>>>> 8dd68feb07d367f040d0a0a98d23abf0d7b90334

      <TextInput
        style={styles.input}
        placeholder="What's goin on in your head?"
        placeholderTextColor="#AD88C6"
        value={goal}
        onChangeText={setGoal}
      />

      <Pressable onPress={handleSubmit} style={styles.button}>
<<<<<<< HEAD
        <Text style={{color: '#FFE6E6',fontWeight: "bold" }}>Add Song</Text>
=======
        <Text style={{color: '#FFE6E6',fontWeight: "bold" }}>Add A Gol</Text>
>>>>>>> 8dd68feb07d367f040d0a0a98d23abf0d7b90334
      </Pressable>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1AFD1',
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
    backgroundColor: '#FFE6E6',
    padding: 20,
    borderRadius: 8,
    marginVertical: 40,
    color: "#7469B6",
  },
  button: {
    padding: 18,
    backgroundColor: '#AD88C6',
    borderRadius: 8,
  }
})