import React, { PropsWithChildren, useMemo } from 'react';
import { ImageBackground, StyleSheet, View, ViewStyle } from 'react-native';

type Props = Pick<
  ViewStyle,
  | 'alignItems'
  | 'justifyContent'
  | 'padding'
  | 'paddingVertical'
  | 'paddingHorizontal'
> & {
  showBackground?: boolean;
};

const ScreenContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  alignItems,
  justifyContent,
  padding,
  paddingVertical,
  paddingHorizontal,
  showBackground,
}) => {
  const compositedStyle = useMemo(
    () =>
      StyleSheet.flatten([
        styles.container,
        alignItems && { alignItems },
        justifyContent && { justifyContent },
        padding && { padding },
        paddingVertical && { paddingVertical },
        paddingHorizontal && { paddingHorizontal },
        !showBackground && { backgroundColor: 'transparent' },
      ]) as ViewStyle,
    [
      alignItems,
      justifyContent,
      padding,
      paddingVertical,
      paddingHorizontal,
      showBackground,
    ],
  );
  if (showBackground) {
    return (
      <ImageBackground
        source={require('../assets/images/bg.png')}
        style={compositedStyle}>
        {children}
      </ImageBackground>
    );
  }
  return <View style={compositedStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenContainer;
