import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { GoalsProvider } from '../../context/GoalsContext'

export default function GoalsLayout() {

  return (
    <GoalsProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#9F2B68',
          tabBarInactiveTintColor: '#E0B0FF',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Your Goals',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24} 
                name={focused ? 'home' : 'home-outline'} 
                color="#9F2B68"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create Goal',
            tabBarIcon: ({ focused }) => (
              <Ionicons 
                size={24} 
                name={focused ? 'create' : 'create-outline'} 
                color="#9F2B68"
              />
            ),
          }}
        />
      </Tabs>
    </GoalsProvider>
  )
}
