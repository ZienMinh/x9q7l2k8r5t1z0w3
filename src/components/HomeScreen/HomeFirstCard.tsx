import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Dimensions, Image, StyleSheet, Text } from 'react-native';
import { MotionManager, CONSTANTS } from '../../lib/cruzr';
import { Config } from '../../config/config';
import LinearGradient from 'react-native-linear-gradient';
import { StackParamList } from '../../config/config';
import { useNavigation } from '../../hooks/useNavigation';
import Pressable from '../Pressable';

type Props = {
  title: string;
  colors: string[];
  icon: number;
  screen: keyof StackParamList;
};

const FirstCard: React.FC<Props> = ({ title, screen, colors, icon }) => {
  const navigation = useNavigation();

  const gradientProps = useMemo(() => {
    return {
      colors,
      start: { x: 0, y: 1 },
      end: { x: 1, y: 0 },
    };
  }, [colors]);

  const onPress = useCallback(() => {
    if (screen === Config.ROUTER.DIRECTION_SCREEN) {
      // perform talk1 action
      MotionManager.performAction(CONSTANTS.ActionUris.TALK1).catch(err =>
        console.warn('Talk1 action failed', err),
      );
    }
    navigation.navigate({ name: screen, params: {} });
  }, [navigation, screen]);

  return (
    <Pressable animateScale onPress={onPress}>
      <LinearGradient {...gradientProps} style={styles.container}>
        <Image source={icon} style={styles.icon} />
        <View />
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: Dimensions.get('window').width / 2.7,
    backgroundColor: '#0080ff',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 3,
    marginRight: 10,
    marginLeft: 40,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    // width: 382 / 2,
    height: 240,
    resizeMode: 'contain',
    marginRight: 30,
  },
});

export default FirstCard;
