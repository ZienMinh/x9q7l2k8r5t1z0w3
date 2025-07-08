// import moment from 'moment';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  // useState,
} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  // ToastAndroid,
  View,
} from 'react-native';
import { BackIcon } from '../assets/images';
import { Config } from '../config/config';
import { useNavigation } from '../hooks/useNavigation';
// import { RobotManager } from '../lib/cruzr';
import Pressable from './Pressable';

type Props = {
  canGoBack?: boolean;
  title: string;
  hidden?: boolean;
};

const Header = ({ canGoBack, title, hidden }: Props) => {
  const navigation = useNavigation();
  // const [currentTime, setCurrentTime] = useState(new Date());
  const animatedTitleRef = useRef(new Animated.Value(0));
  const animatedHeaderRef = useRef(new Animated.Value(hidden ? 0 : 1));

  // useEffect(() => {
  //   const intervalID = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);
  //   return () => {
  //     clearInterval(intervalID);
  //   };
  // }, []);

  useEffect(() => {
    Animated.timing(animatedTitleRef.current, {
      toValue: title ? 1 : 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [title]);

  useEffect(() => {
    Animated.timing(animatedHeaderRef.current, {
      toValue: hidden ? 0 : 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
    console.log('Header: useEffect hidden', hidden);
  }, [hidden]);

  // const showIpAddress = useCallback(() => {
  //   RobotManager.getWifiIpAddress().then(ip => {
  //     ToastAndroid.show(ip, ToastAndroid.SHORT);
  //   });
  // }, []);

  const onGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

  const resetToSelectLanguage = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: Config.ROUTER.LANGUAGE_SCREEN, params: {} }],
    });
  }, [navigation]);

  const navigateToSyncData = useCallback(() => {
    // navigation.navigate(Config.ROUTER.SECURITY_SCREEN, {});
  }, []);

  // const animatedStyle = useMemo(() => {
  //   return StyleSheet.flatten([styles.container]);
  // }, []);

  const animatedContainerStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.container,
      {
        height: animatedHeaderRef.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 70],
        }),
      },
    ]);
  }, [animatedHeaderRef]);

  return (
    <Animated.View style={animatedContainerStyle}>
      <View style={styles.left_area}>
        {canGoBack && (
          <Pressable onPress={onGoBack}>
            <Image style={styles.back_icon} source={BackIcon} />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.rowCenter}>
        {/* <View style={styles.dateTime}>
          <Text style={styles.date}>{moment(currentTime).format('LL')}</Text>
          <Pressable onLongPress={showIpAddress}>
            <Text style={styles.time}>
              {moment(currentTime).format('HH:mm')}
            </Text>
          </Pressable>
        </View> */}
        <Pressable
          onPress={resetToSelectLanguage}
          onLongPress={navigateToSyncData}
          delayLongPress={3000}>
          <Image
            source={require('../assets/images/icons/languages.png')}
            style={styles.languageIcon}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    height: 70,
    overflow: 'hidden',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left_area: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back_icon: {
    width: 32,
    height: 32,
    marginRight: 30,
    tintColor: 'white',
  },
  title: {
    fontSize: 32,
    color: 'white',
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 50,
    fontWeight: '600',
    color: 'white',
  },
  date: {
    fontSize: 24,
    marginRight: 15,
    color: 'white',
    paddingBottom: 8,
  },
  languageIcon: {
    height: 50,
    width: 50,
    marginLeft: 15,
  },
});
export default memo(Header);
