import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';

interface TiltCardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export default function TiltCard({ children, style, onPress }: TiltCardProps) {
  const tilt = new Animated.Value(0);
  const rotate = tilt.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '4deg'] });
  const scale = tilt.interpolate({ inputRange: [0, 1], outputRange: [1, 0.99] });

  const onPressIn = () => {
    Animated.spring(tilt, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  };
  const onPressOut = () => {
    Animated.spring(tilt, { toValue: 0, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  };

  return (
    <TouchableOpacity activeOpacity={0.95} onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.View style={[style, { transform: [{ perspective: 800 }, { rotateY: rotate }, { scale }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}
