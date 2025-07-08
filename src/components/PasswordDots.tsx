// src/components/PasswordDots.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

type PasswordDotsProps = {
  password: string;
  onPasswordFilled: () => void;
};

const PasswordDots = ({ password, onPasswordFilled }: PasswordDotsProps) => {
  useEffect(() => {
    if (password.length === 6) {
      onPasswordFilled();
    }
  }, [password, onPasswordFilled]);

  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, i) => (
        <View key={i} style={styles.wrapperDot}>
          <View style={styles.dotContainer}>
            {i < password.length ? <View style={styles.dot} /> : null}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapperDot: { width: 50, justifyContent: 'center', alignItems: 'center' },
  dotContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default PasswordDots;
