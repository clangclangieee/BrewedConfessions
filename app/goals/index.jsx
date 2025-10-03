import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGoals } from "../../hooks/useGoals"   // 👈 import your hook
import { useRouter } from "expo-router";


const Goals = () => {
  const { goals, deleteGoal } = useGoals() 
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Image 
              source={require('../../assets/images/hyunie.gif')}
              style={styles.gif}
              resizeMode="cover" 
            />
      <Text style={styles.title}>Your Goals</Text>

      {goals.length === 0 ? (
        <Text style={styles.emptyText}>No goals yet. Add one!</Text>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{item.goal}</Text>

              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => router.push(`/goals/update/${item.id}`)} // 👈 navigate to update page
              >
                <Text style={styles.updateText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => deleteGoal(item.id)}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

export default Goals

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
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
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: '#9F2B68',
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
    color: "#E0B0FF",
  },
  goalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",  
    marginHorizontal: 20,
  },
  goalText: {
    flex: 1,
    fontSize: 18,
    color: '#9F2B68',
    fontWeight: 'bold',
    marginRight: 10, 
  },
  updateBtn: {
    backgroundColor: "#BE93E4",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
    marginRight: 8,
  },
  updateText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteBtn: {
    backgroundColor: "#9F2B68",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'center',
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
