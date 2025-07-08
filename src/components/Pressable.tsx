import React, { PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import {
  Animated,
  Pressable as RNPressable,
  PressableProps,
  StyleSheet,
} from 'react-native';

type Props = {
  onPress?: () => void;
  title?: string;
  animateScale?: boolean;
  animateOpacity?: boolean;
  onLongPress?: () => void;
  delayLongPress?: number;
  style?: PressableProps['style'];
  disabled?: boolean;
};

const Pressable: React.FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  animateScale,
  animateOpacity,
  onLongPress,
  delayLongPress,
  disabled,
}) => {
  const animatedValue = useRef(new Animated.Value(0));

  const buttonStyle = useMemo(() => {
    return StyleSheet.flatten([
      animateOpacity && {
        opacity: animatedValue.current.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        }),
      },
      animateScale && {
        transform: [
          {
            scale: animatedValue.current.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.05],
            }),
          },
        ],
      },
      styles.button,
    ]);
  }, [animateOpacity, animateScale]);

  const handlePressIn = useCallback(() => {
    Animated.timing(animatedValue.current, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const handlePressOut = useCallback(() => {
    Animated.timing(animatedValue.current, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <RNPressable
      disabled={disabled}
      onPress={onPress}
      delayLongPress={delayLongPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={buttonStyle}>{children}</Animated.View>
    </RNPressable>
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default Pressable;
