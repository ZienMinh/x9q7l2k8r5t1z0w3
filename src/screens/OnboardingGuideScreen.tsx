import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import { ttsService } from '../services/tts-service';
import { ActionUris } from '../lib/cruzr/constants';
import { MotionManager } from '../lib/cruzr';
import { useNavigation } from '@react-navigation/native';

const guideImages = [
  require('../assets/images/icons/1.png'),
  require('../assets/images/icons/2.png'),
  require('../assets/images/icons/3.png'),
  require('../assets/images/icons/4.png'),
];

// const guideTitles = [
//   'Bước 1: Tải ứng dụng',
//   'Bước 2: Mở ứng dụng và đăng ký',
//   'Bước 3: Nhấn vào mục đăng ký',
//   'Bước 4: Vui lòng điền đầy đủ thông tin của bạn để thực hiện đăng ký',
// ];

const guideSpeaks = [
  'Bước 1: Vui lòng tải ứng dụng về điện thoại của bạn.',
  'Bước 2: Mở ứng dụng và nhấn vào phần tài khoản để thực hiện đăng ký tài khoản.',
  'Bước 3: Nhấn vào mục đăng ký',
  'Bước 4: Vui lòng điền đầy đủ thông tin của bạn để thực hiện đăng ký, lưu ý tên đăng nhập không có khoảng cách.',
];

const guideActions = [
  ActionUris.TALK21,
  ActionUris.TALK22,
  ActionUris.TALK23,
  ActionUris.TALK24,
];

const { width, height } = Dimensions.get('window');

const OnboardingGuideScreen: React.FC = () => {
  const [index, setIndex] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    ttsService.speak('vi-VN', guideSpeaks[index]);
    MotionManager.performAction(guideActions[index]).catch(err =>
      console.warn('Action failed', err),
    );
  }, [index]);

  const goToPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const goToNext = () => {
    if (index < guideImages.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <ScreenContainer>
      {/* <Text style={styles.title}>{guideTitles[index]}</Text> */}
      <View style={styles.imageContainer}>
        <Image source={guideImages[index]} style={styles.image} />
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, index === 0 && styles.buttonDisabled]}
          disabled={index === 0}
          onPress={goToPrevious}>
          <Text style={styles.buttonText}>Quay lại</Text>
        </TouchableOpacity>
        <View style={styles.pagination}>
          {guideImages.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, index === i && styles.activeDot]}
            />
          ))}
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            index === guideImages.length - 1 && styles.buttonDisabled,
          ]}
          disabled={index === guideImages.length - 1}
          onPress={goToNext}>
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
    color: '#FFFFFF',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.3,
    maxWidth: 280,
    height: height * 0.7,
    maxHeight: 400,
    resizeMode: 'contain',
    borderRadius: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OnboardingGuideScreen;
