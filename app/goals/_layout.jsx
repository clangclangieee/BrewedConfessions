// app/goals/_layout.jsx
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GoalsProvider } from "../../context/GoalsContext";
import { useAuth } from "../context/AuthContext";

export default function GoalsLayout() {
  const { user, loading } = useAuth();

  if (loading) return null; // optional spinner
  if (!user) return <Redirect href="/login" />;

  return (
    <GoalsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#AD88C6",
          tabBarInactiveTintColor: "#E1AFD1",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
<<<<<<< HEAD
            title: "Your Songs",
=======
            title: "Your Goals",
>>>>>>> 8dd68feb07d367f040d0a0a98d23abf0d7b90334
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "planet" : "planet-outline"}
                color="#AD88C6"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
<<<<<<< HEAD
            title: "Add Song",
=======
            title: "Create Goal",
>>>>>>> 8dd68feb07d367f040d0a0a98d23abf0d7b90334
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "ice-cream" : "ice-cream-outline"}
                color="#AD88C6"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="update/[id]"
          options={{
<<<<<<< HEAD
            title: "Update Song",
=======
            title: "Update Goal",
>>>>>>> 8dd68feb07d367f040d0a0a98d23abf0d7b90334
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "brush" : "brush-outline"}
                color="#AD88C6"
              />
            ),
          }}
        />
        {/* ✅ New Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "flower" : "rose-outline"}
                color="#AD88C6"
              />
            ),
          }}
        />
      </Tabs>
    </GoalsProvider>
  );
}
