import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { StyleSheet, Text, View } from "react-native";

export default function SearchScreen() {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <Text
        style={[styles.text, { color: Colors[colorScheme ?? "light"].text }]}
      >
        🔍 Search
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
