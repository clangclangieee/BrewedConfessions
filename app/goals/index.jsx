import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGoals } from "../../hooks/useGoals";
import { useRouter } from "expo-router";

const Goals = () => {
  const { goals, deleteGoal } = useGoals(); 
  const router = useRouter();

  // Helper function to format the date nicely
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString(); // e.g., "10/8/2025, 12:34:56 PM"
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image 
        source={require('../../assets/images/tea.gif')}
        style={styles.gif}
        resizeMode="cover" 
      />

      <Text style={styles.title}> 𝒮𝓅𝒾𝓁𝓁𝑒𝒹 𝒯𝑒𝒶 </Text>

      {goals.length === 0 ? (
        <Text style={styles.emptyText}>Have some tea? Spill it!</Text>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.goalItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.goalText}>{item.goal}</Text>
                {item.description ? (
                  <Text style={styles.descriptionText}>{item.description}</Text>
                ) : null}
                {item.createdAt ? (
                  <Text style={styles.dateText}>Spilled: {formatDate(item.createdAt)}</Text>
                ) : null}
              </View>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={() => router.push(`/goals/update/${item.id}`)}
                >
                  <Text style={styles.updateText}>EDIT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => deleteGoal(item.id)}
                >
                  <Text style={styles.deleteText}>DELETE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default Goals;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingTop: 30, 
    paddingHorizontal: 20, 
    backgroundColor: "#E1AFD1" 
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
    textAlign: "center", 
    marginBottom: 20, 
    fontWeight: "bold", 
    color: '#AD88C6' 
  },
  emptyText: { 
    fontSize: 16, 
    textAlign: "center", 
    marginTop: 50, 
    color: '#FFE6E6' 
  },
  goalItem: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "flex-start", 
    padding: 15, 
    backgroundColor: "#FFE6E6", 
    borderRadius: 8, 
    marginBottom: 20, 
    width: "90%", 
    alignSelf: "center" },
  goalText: { 
    fontSize: 18, 
    color: '#AD88C6', 
    fontWeight: 'bold', 
    marginBottom: 5 
  },
  descriptionText: { 
    fontSize: 14, 
    color: '#7469B6', 
    marginBottom: 5 },
  dateText: { 
    fontSize: 12, 
    color: '#AD88C6', 
    fontStyle: 'italic' 
  },
  buttonsContainer: { 
    flexDirection: "row" 
  },
  updateBtn: { backgroundColor: "#AD88C6", paddingVertical: 6, paddingHorizontal: 14, borderRadius: 5, marginRight: 8 },
  updateText: { color: "#FFE6E6", fontWeight: "bold" },
  deleteBtn: { backgroundColor: "#7469B6", paddingVertical: 5, paddingHorizontal: 12, borderRadius: 5, alignSelf: 'center' },
  deleteText: { color: "#FFE6E6", fontWeight: "bold" },
});
