import React, { useEffect, useState } from 'react';
import { AccessibilityInfo, Animated, StyleProp, ViewStyle } from 'react-native';
export function Pulse({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
 const [opacity] = useState(() => new Animated.Value(1));
 useEffect(() => {
  let animation: Animated.CompositeAnimation | undefined;
  let mounted = true;
  const update = (reduced: boolean) => { animation?.stop(); opacity.setValue(1); if (!reduced && mounted) { animation = Animated.loop(Animated.sequence([Animated.timing(opacity, { toValue: 0.48, duration: 900, useNativeDriver: true }), Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: true })])); animation.start(); } };
  AccessibilityInfo.isReduceMotionEnabled().then(update);
  const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', update);
  return () => { mounted = false; animation?.stop(); sub.remove(); };
 }, [opacity]);
 return <Animated.View style={[style, { opacity }]}>{children}</Animated.View>;
}

