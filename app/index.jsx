import { Link } from 'expo-router'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleMain}>𝙾𝚏𝚏𝚝𝚛𝚊𝚌𝚔</Text>
      </View>

      <Image
        source={require('../assets/images/lofi.gif')}
        style={styles.gif}
        resizeMode="cover"
      />

      <Link href="/goals" asChild>
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonText}>View Your Songs</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/goals/create" asChild>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonText}>Add a New Song</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E1AFD1',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleMain: {
    fontSize: 32,
    fontWeight: 'bold',
    color: "#7469B6",
    letterSpacing: 2,
  },
  gif: {
    width: 250,       
    height: 250,      
    borderRadius: 20, 
    overflow: 'hidden',
    marginBottom: 30, 
    alignSelf: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#AD88C6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: "#7469B6",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  buttonText: {
    color: '#FFE6E6',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default Home
