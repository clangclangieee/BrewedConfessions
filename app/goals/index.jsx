import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useGoals } from "../../hooks/useGoals"   // 👈 import your hook

const Goals = () => {
  const { goals, deleteGoal } = useGoals()   // 👈 get goals + delete function

  return (
    <SafeAreaView style={styles.container}>
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

              {/* Example delete button */}
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
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
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
    width: "75%",
    alignSelf: "center",  
    marginHorizontal: 20,
  },
  goalText: {
    fontSize: 18,
  },
  deleteBtn: {
    backgroundColor: "#9F2B68",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
