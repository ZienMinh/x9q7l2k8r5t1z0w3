import React from 'react';
import ScreenContainer from '../components/ScreenContainer';
import { useConfigContext } from '../providers/ConfigProvider';
import { StyleSheet, Text, View } from 'react-native';
import Pressable from '../components/Pressable';
import { RobotManager } from '../lib/cruzr';

const LoadingScreen = () => {
  const { error } = useConfigContext();
  return (
    <ScreenContainer showBackground alignItems="center" justifyContent="center">
      {error ? <Text style={styles.syncText}>{error.message}</Text> : null}
      <Pressable animateScale onPress={RobotManager.restartApplication}>
        <View style={styles.restartButton}>
          <Text style={styles.restartText}>Khởi động lại ứng dụng!!!</Text>
        </View>
      </Pressable>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  syncText: {
    color: 'red',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  restartButton: {
    // backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 40,
  },
  restartText: {
    color: '#4285f4',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default LoadingScreen;
