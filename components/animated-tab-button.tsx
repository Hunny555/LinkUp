import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

export function AnimatedTabButton({
  children,
  accessibilityState,
  onPress,
}: any) {
  const focused = accessibilityState?.selected;
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      translateY.value = withSpring(-12, { damping: 12 });
      scale.value = withSpring(1.15);
    } else {
      translateY.value = withSpring(0);
      scale.value = withSpring(1);
    }
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Pressable onPress={onPress} style={{ flex: 1, alignItems: "center" }}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </Pressable>
  );
}
