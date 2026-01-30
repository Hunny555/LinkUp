import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";

import { AnimatedTabButton } from "@/components/animated-tab-button";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tint = Colors[colorScheme ?? "light"].tint;
  // 🔐 Auth Guard
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        router.replace("/login"); // 👈 redirect to login
      }
    };

    checkAuth();
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarButton: (props) => <AnimatedTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={28} color={focused ? tint : "#999"} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          tabBarButton: (props) => <AnimatedTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="search" size={28} color={focused ? tint : "#999"} />
          ),
        }}
      />

      <Tabs.Screen
        name="trending"
        options={{
          tabBarButton: (props) => <AnimatedTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="flame" size={28} color={focused ? tint : "#999"} />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarButton: (props) => <AnimatedTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="chatbubble"
              size={28}
              color={focused ? tint : "#999"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarButton: (props) => <AnimatedTabButton {...props} />,
          tabBarIcon: ({ focused }) => (
            <Ionicons name="person" size={28} color={focused ? tint : "#999"} />
          ),
        }}
      />
    </Tabs>
  );
}
