import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import ViewCard from '../components/ViewCard';
import { Config } from '../config/config';
import { useTranslation } from 'react-i18next';
import Spacer from '../components/Spacer';
import { ttsService } from '../services/tts-service';
import FirstCard from '../components/HomeScreen/HomeFirstCard';
import ScreenContainer from '../components/ScreenContainer';
import { useHeaderContext } from '../providers/HeaderProvider';
import { useIsFocused } from '@react-navigation/native';

const gridData = [
  {
    key: 'directions',
    colors: ['#4CAF50', '#81C784'], // green gradient for camera
    icon: require('../assets/images/camera.png'),
    screen: Config.ROUTER.DIRECTION_SCREEN,
  },
  {
    key: 'emotions',
    colors: ['#FF4081', '#F06292'], // pink gradient for emotion
    icon: require('../assets/images/physics.png'),
    screen: Config.ROUTER.EMOTION_SCREEN,
  },
] as const;

const HomeScreen = () => {
  const { t } = useTranslation('home');
  const { t: tLang } = useTranslation('lang');
  const isFocused = useIsFocused();
  const setHeader = useHeaderContext();

  useEffect(() => {
    if (isFocused) {
      ttsService.speak(tLang('voice'), t('navbar.title'));
      setHeader({
        title: t('navbar.title'),
        canGoBack: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, setHeader]);

  useEffect(() => {
    return () => {
      setHeader({
        title: '',
        canGoBack: false,
      });
    };
  }, [setHeader]);

  return (
    <ScreenContainer>
      <View style={styles.buttonRow}>
        {gridData.map((item, index) => (
          <View key={item.key} style={styles.cardWrapper}>
            {index === 0 ? (
              <FirstCard
                colors={item.colors as [string, string]}
                icon={item.icon}
                title={t(item.key)}
                screen={item.screen}
              />
            ) : (
              <ViewCard
                title={t(item.key)}
                icon={item.icon}
                colors={item.colors as [string, string]}
                screen={item.screen}
                screenKey={item.key}
              />
            )}
          </View>
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  cardWrapper: {
    width: Dimensions.get('window').width / 2.5,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
