import {
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import ScreenContainer from '../components/ScreenContainer';
import { useNavigation } from '../hooks/useNavigation';
import { useHeaderContext } from '../providers/HeaderProvider';
import { useIsFocused } from '@react-navigation/native';
import { Config } from '../config/config';
import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

const emotions = [
  {
    key: 'smile',
    title: 'Mỉm cười',
    video: require('../assets/images/smile.mp4'),
  },
  {
    key: 'cringe',
    title: 'Khó chịu',
    video: require('../assets/images/cringe cringe.mp4'),
  },
  {
    key: 'speaking',
    title: 'Nói chuyện',
    video: require('../assets/images/speaking attitude.mp4'),
  },
  {
    key: 'craii',
    title: 'Khóc',
    video: require('../assets/images/Craii.mp4'),
  },
];

const EmotionScreen: React.FC = () => {
  const [tLang] = useTranslation('lang');
  const setHeader = useHeaderContext();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const handlePress = (emotion: any) => {
    setSelectedVideo(emotion.video);
    setIsVideoVisible(true);
  };

  const closeVideo = () => {
    setIsVideoVisible(false);
    setSelectedVideo(null);
  };

  useEffect(() => {
    if (isFocused) {
      setHeader({ title: 'Cảm xúc của tôi', canGoBack: true, hidden: false });
    }
  }, [isFocused, setHeader, tLang]);

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        {emotions.map(emotion => (
          <Pressable
            key={emotion.key}
            style={styles.button}
            onPress={() => handlePress(emotion)}>
            <Text style={styles.text}>{emotion.title}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Modal
        visible={isVideoVisible}
        animationType="fade"
        onRequestClose={closeVideo}>
        <View style={styles.videoContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeVideo}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          {selectedVideo && (
            <Video
              source={selectedVideo}
              style={styles.video}
              resizeMode="contain"
              repeat={true}
              paused={false}
            />
          )}
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    padding: 12,
    margin: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  video: {
    width: width,
    height: height,
  },
});

export default EmotionScreen;
