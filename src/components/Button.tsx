import React, { PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  onPress: () => void;
  title?: string;
};

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  title,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const buttonStyle = useMemo(() => {
    return StyleSheet.flatten([
      {
        transform: [
          {
            scale: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            }),
          },
        ],
        opacity: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.8],
        }),
      },
      styles.button,
    ]);
  }, [animatedValue]);

  const handlePressIn = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const handlePressOut = useCallback(() => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={buttonStyle}>
        <Text numberOfLines={1} style={styles.buttonText}>
          {title || children}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#195de6',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Button;
