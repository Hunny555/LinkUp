import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Main Tabs */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Login Modal */}
        <Stack.Screen
          name="login"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            presentation: "modal",
            headerShown: false,
          }}
        />

        {/* Any other modal */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
            title: "Modal",
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
