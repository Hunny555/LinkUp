import { View, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: Colors[colorScheme ?? 'light'].background }
    ]}>
      <Text style={[styles.text, { color: Colors[colorScheme ?? 'light'].text }]}>
        💬 Chat
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});