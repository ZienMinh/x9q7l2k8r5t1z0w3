import React from 'react';
import { ScrollView, StyleSheet, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import ScreenContainer from '../components/ScreenContainer';
import { EmotionUris } from '../lib/cruzr/constants';
import { EmotionManager } from '../lib/cruzr';
import { useNavigation } from '../hooks/useNavigation';
import { Config } from '../config/config';

const EmotionScreen: React.FC = () => {
  // @ts-ignore: using custom 'emotion' namespace not in default types
  const { t } = useTranslation('emotion');
  const emotionEntries = Object.entries(EmotionUris) as Array<[string, string]>;

  const navigation = useNavigation();
  // Call emotion without awaiting
  const handlePress = (uri: string) => {
    EmotionManager.expressEmotion(uri)
      .catch(e => console.warn('Failed to express emotion', e))
      .finally(() => navigation.goBack());
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        {emotionEntries.map(([key, uri]) => (
          <Pressable key={key} style={styles.button} onPress={() => handlePress(uri)}>
            {/* @ts-ignore: t(key) may be typed as string | string[] */}
            <Text style={styles.text}>{t(key)}</Text>
          </Pressable>
        ))}
      </ScrollView>
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
});

export default EmotionScreen; 