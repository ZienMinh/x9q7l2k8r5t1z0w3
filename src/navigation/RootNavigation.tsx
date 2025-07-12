import * as React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import { Config } from '../config/config';
import LanguageScreen from '../screens/LanguageScreen';
import HomeScreen from '../screens/HomeScreen';
import AirportScreen from '../screens/AirportScreen';
import DirectionsScreen from '../screens/DirectionsScreen';
import StoreScreen from '../screens/StoreScreen';
import ScreenContainer from '../components/ScreenContainer';
import HeaderContextProvider from '../providers/HeaderProvider';
import NavigateScreen from '../screens/NavigateScreen';
import StoreMenuScreen from '../screens/StoreMenuScreen';
import EmotionScreen from '../screens/EmotionScreen';
import OnboardingGuideScreen from '../screens/OnboardingGuideScreen';
import { useNavigation } from '../hooks/useNavigation';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
import PasswordScreen from '../screens/PasswordScreen';

const Stack = createNativeStackNavigator();
const navigateConfig: NativeStackNavigationOptions = {
  headerShown: false,
  animationTypeForReplace: 'push',
  animation: 'slide_from_right',
};

const navigateSceenNavgationConfig: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'fade',
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function RootNavigation() {
  return (
    <NavigationContainer theme={theme}>
      <ScreenContainer showBackground>
        <AppNavigator />
      </ScreenContainer>
    </NavigationContainer>
  );
}

const AppNavigator = () => {
  const WHITE_LIST = React.useMemo(
    () => [
      Config.ROUTER.LANGUAGE_SCREEN,
      Config.ROUTER.SYNC_DATA_SCREEN,
      Config.ROUTER.SECURITY_SCREEN,
      Config.ROUTER.DIRECTION_SCREEN,
      Config.ROUTER.ONBOARDING_GUIDE_SCREEN,
    ],
    [],
  );
  const timeoutId = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigation = useNavigation();
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const shouldResetToHomeRef = React.useRef(false);

  const onTouch = React.useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
      animatedValue.stopAnimation();
      animatedValue.setValue(width);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: Config.GO_TO_HOME_TIMEOUT,
        useNativeDriver: false,
      }).start();
    }
    if (!shouldResetToHomeRef.current) {
      animatedValue.stopAnimation();
      animatedValue.setValue(0);
      return;
    }
    timeoutId.current = setTimeout(() => {
      if (shouldResetToHomeRef.current) {
        navigation.reset({
          routes: [
            {
              name: Config.ROUTER.LANGUAGE_SCREEN,
              params: {},
            },
          ],
        });
      }
    }, Config.GO_TO_HOME_TIMEOUT);
  }, [animatedValue, navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', e => {
      if (!e.data.state || !e.data.state.routes[e.data.state.index]) {
        return;
      }
      const currentRouteName = e.data.state.routes[e.data.state.index].name;
      shouldResetToHomeRef.current = !WHITE_LIST.includes(currentRouteName);

      onTouch();
    });

    return unsubscribe;
  }, [WHITE_LIST, navigation, onTouch]);

  return (
    <View style={styles.root} onTouchStart={onTouch}>
      <HeaderContextProvider>
        <Stack.Navigator
          initialRouteName={Config.ROUTER.LANGUAGE_SCREEN}
          screenOptions={navigateConfig}>
          <Stack.Group>
            <Stack.Screen
              name={Config.ROUTER.LANGUAGE_SCREEN}
              component={LanguageScreen}
            />
          </Stack.Group>
          <Stack.Group>
            <Stack.Screen
              name={Config.ROUTER.HOME_SCREEN}
              component={HomeScreen}
            />
            <Stack.Screen
              name={Config.ROUTER.AIRPORT_SCREEN}
              component={AirportScreen}
            />
            <Stack.Screen
              name={Config.ROUTER.STORE_SCREEN}
              component={StoreScreen}
            />
            <Stack.Screen
              name={Config.ROUTER.DIRECTION_SCREEN}
              component={DirectionsScreen}
            />
            <Stack.Screen
              name={Config.ROUTER.NAVIGATE_SCREEN}
              component={NavigateScreen}
              options={navigateSceenNavgationConfig}
            />
            <Stack.Screen
              name={Config.ROUTER.SECURITY_SCREEN}
              component={PasswordScreen}
            />
            <Stack.Screen
              name={Config.ROUTER.STORE_MENU_SCREEN}
              component={StoreMenuScreen}
            />
            <Stack.Screen
              name={Config.ROUTER.EMOTION_SCREEN}
              component={EmotionScreen}
            />
            <Stack.Screen
              name={Config.ROUTER.ONBOARDING_GUIDE_SCREEN}
              component={OnboardingGuideScreen}
            />
          </Stack.Group>
        </Stack.Navigator>
      </HeaderContextProvider>
      <Animated.View style={[styles.overlay, { width: animatedValue }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  overlay: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});
