import React, { useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import qrAndroid from '../assets/images/icons/QR_Android.png';
import qrIOS from '../assets/images/icons/QR_IOS.png';
import { useTranslation } from 'react-i18next';
import { useHeaderContext } from '../providers/HeaderProvider';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ttsService } from '../services/tts-service';
import { Config } from '../config/config';

const DirectionsScreen: React.FC = () => {
  const [t] = useTranslation('directions');
  const [tLang] = useTranslation('lang');
  const setHeader = useHeaderContext();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      ttsService.speak(tLang('voice'), t('navbar.instruction'));
      setHeader({ title: t('navbar.title'), canGoBack: true, hidden: false });
    }
  }, [isFocused, setHeader, t, tLang]);

  return (
    <ScreenContainer>
      {/* <Text style={styles.title}>
        Vui lòng quét mã QR để tải ứng dụng lấy số thứ tự
      </Text> */}
      <View style={styles.qrRow}>
        <View style={styles.qrBlock}>
          <Image source={qrAndroid} style={styles.qrImage} />
          <Text style={styles.label}>Dành cho Android</Text>
        </View>
        <View style={styles.qrBlock}>
          <Image source={qrIOS} style={styles.qrImage} />
          <Text style={styles.label}>Dành cho iOS</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.guideButton}
        onPress={() =>
          navigation.navigate(Config.ROUTER.ONBOARDING_GUIDE_SCREEN as never)
        }>
        <Text style={styles.guideButtonText}>Xem hướng dẫn đăng ký</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#FFFFFF',
  },
  qrRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
  },
  qrBlock: {
    alignItems: 'center',
    flex: 1,
  },
  qrImage: {
    width: Dimensions.get('window').width / 3.5,
    height: Dimensions.get('window').width / 3.5,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  guideButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  guideButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DirectionsScreen;
