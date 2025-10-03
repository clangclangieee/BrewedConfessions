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
          tabBarActiveTintColor: "#9F2B68",
          tabBarInactiveTintColor: "#E0B0FF",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Your Goals",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "home" : "planet-outline"}
                color="#9F2B68"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create Goal",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "ice-cream" : "ice-cream-outline"}
                color="#9F2B68"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="update/[id]"
          options={{
            title: "Update Goal",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? "brush" : "brush-outline"}
                color="#9F2B68"
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
                name={focused ? "person" : "person-outline"}
                color="#9F2B68"
              />
            ),
          }}
        />
      </Tabs>
    </GoalsProvider>
  );
}
