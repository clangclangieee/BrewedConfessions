import { Link } from 'expo-router'
import { View, Text, StyleSheet, Image } from 'react-native'

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        M Y  G O A L S ,  M Y  K N E E S
      </Text>
       <Image 
        source={require('../assets/images/kwan.gif')}
        style={{
        width: 250,       
        height: 250,      
        borderRadius: 20, 
        overflow: 'hidden', 
        }}
        resizeMode="cover" 
      />
      <Link style={styles.link} href="/goals">
        View Your Goals
      </Link>
      <Link style={styles.link} href="/goals/create">
        Add a New Goal
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D6CADD',
  },
  title: {
    marginVertical: 40,
    fontSize: 28,
    color: '#9F2B68',
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#BE93E4',
    color: 'white',
    borderRadius: 8,
    fontWeight: 'bold',
  },
})

export default Home