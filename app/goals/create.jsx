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
        source={require('../../assets/images/lix.gif')}
        style={styles.gif}
        resizeMode="cover" 
      />
      <Text style={styles.title}>Create a New Gol</Text>

      <TextInput
        style={styles.input}
        placeholder="What's goin on in your head?"
        placeholderTextColor="#fff"
        value={goal}
        onChangeText={setGoal}
      />

      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={{color: '#fff',fontWeight: "bold" }}>Add A Gol</Text>
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
    backgroundColor: '#D6CADD',
  },
  gif: {
    width: 250,       
    height: 250,      
    borderRadius: 20, 
    overflow: 'hidden',
    marginBottom: 30, 
  },
  title: {
    fontSize: 24,
    color: '#9F2B68',
    fontWeight: "bold",
  },
  input: {
    width: 300,
    backgroundColor: '#BE93E4',
    padding: 20,
    borderRadius: 8,
    marginVertical: 40,
  },
  button: {
    padding: 18,
    backgroundColor: '#BE93E4',
    color: 'white',
    borderRadius: 8,
  }
})