// src/screens/PasswordScreen.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Text, ToastAndroid, Pressable } from 'react-native';
import { Config } from '../config/config';
import { useNavigation } from '../hooks/useNavigation';
import VirtualKeyboard from './VirtualKeyboard';
import PasswordDots from '../components/PasswordDots';
// import { useSync } from '../services/sync.service';
// import sha256 from 'crypto-js/sha256';
import { RobotManager } from '../lib/cruzr';
import { useHeaderContext } from '../providers/HeaderProvider';

const PasswordScreen = () => {
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();
  const setHeader = useHeaderContext();
  // const hashKey = useSync(
  //   useCallback(
  //     state =>
  //       state.config?.hashkey ||
  //       'a4b77deb36de044f08eb131888da7263f00a02a8b3cb9621f666471fc2c3dfef',
  //     [],
  //   ),
  // );

  const onGoBack = useCallback(() => {
    navigation.reset({
      routes: [
        {
          name: Config.ROUTER.LANGUAGE_SCREEN,
        },
      ],
    });
  }, [navigation]);

  const validatePassword = async () => {
    const robotAdminPassword = await RobotManager.getPassword();
    if (password === robotAdminPassword) {
      navigation.navigate(Config.ROUTER.SYNC_DATA_SCREEN, {});
    } else {
      setPassword('');
      ToastAndroid.show('Mật khẩu không đúng!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    setHeader({
      title: '',
      canGoBack: true,
      hidden: true,
    });
  }, [setHeader]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Nhập mật khẩu</Text>
        <PasswordDots password={password} onPasswordFilled={validatePassword} />
        <VirtualKeyboard
          onPress={(key: string) => {
            if (password.length < 6) {
              setPassword(prevPassword => prevPassword + key);
            }
          }}
        />
        <Pressable style={styles.button} onPress={onGoBack}>
          <Text style={styles.buttonText}>THOÁT</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '50%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default PasswordScreen;
