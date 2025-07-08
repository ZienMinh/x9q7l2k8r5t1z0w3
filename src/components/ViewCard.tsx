import React, { memo, useCallback, useMemo } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackParamList } from '../config/config';
import { useNavigation } from '../hooks/useNavigation';
import Pressable from './Pressable';

type Props = {
  title: string;
  icon: number;
  colors: string[];
  screen: keyof StackParamList;
  screenKey: string;
};
const ViewCard: React.FC<Props> = props => {
  const navigation = useNavigation();
  const { screen } = props;

  const gradientProps = useMemo(() => {
    return {
      colors: props.colors,
      start: { x: 0, y: 1 },
      end: { x: 1, y: 0 },
    };
  }, [props.colors]);

  const onPress = useCallback(() => {
    navigation.navigate({
      name: screen,
      params: { key: props.screenKey },
    });
  }, [navigation, props.screenKey, screen]);

  return (
    <Pressable animateScale onPress={onPress}>
      <LinearGradient style={styles.container} {...gradientProps}>
        <View style={styles.view_icon}>
          <Image style={styles.icon} source={props.icon} />
        </View>
        <Text style={styles.title}>{props.title}</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2.7,
    marginHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    height: '100%',
    paddingVertical: 20,
  },

  title: {
    fontSize: 40,
    color: 'white',
    marginTop: 'auto',
    marginBottom: 5,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    textAlign: 'center',
  },

  icon: {
    width: '40%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },

  view_icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default memo(ViewCard);
