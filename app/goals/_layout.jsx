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
            title: "Your Songs",
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
            title: "Add Song",
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
            title: "Update Song",
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
