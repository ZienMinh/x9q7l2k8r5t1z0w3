import React, { useEffect } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import qr from '../assets/images/icons/QR.png';
import { useTranslation } from 'react-i18next';
import { useHeaderContext } from '../providers/HeaderProvider';
import { useIsFocused } from '@react-navigation/native';
import { ttsService } from '../services/tts-service';

console.log(Dimensions.get('window'));

const DirectionsScreen: React.FC = () => {
  const [t] = useTranslation('directions');
  const [tLang] = useTranslation('lang');
  const setHeader = useHeaderContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      ttsService.speak(tLang('voice'), t('navbar.title'));
      setHeader({ title: t('navbar.title'), canGoBack: true, hidden: false });
    }
  }, [isFocused]);

  return (
    <ScreenContainer>
      <Image source={qr} style={styles.qrImage} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  qrImage: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
});

export default DirectionsScreen;
