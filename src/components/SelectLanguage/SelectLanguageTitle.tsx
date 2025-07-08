import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, StyleSheet, TextStyle } from 'react-native';
import { ttsService } from '../../services/tts-service';

const SelectLanguageTitle: React.FC = () => {
  const [t, i18n] = useTranslation('lang');

  const languages = useMemo(() => {
    return (i18n.options.supportedLngs || [])
      .filter((supportedLng: string) => supportedLng !== 'cimode')
      .map((supportedLng: string) => ({
        lang: supportedLng,
        voice: t('voice', { lng: supportedLng }),
        select: t('select', { lng: supportedLng }),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [index, setIndex] = useState(0);
  const animatedValue = useRef(new Animated.Value(0));
  const count = useRef(0);
  const mountedRef = useRef(true);
  const animatedRef = useRef<Animated.CompositeAnimation | null>(null);

  const startAnimatePromise = useCallback(() => {
    return new Promise(resolve => {
      if (!mountedRef.current) {
        return console.log('SelectLanguageTitle is unmounted. Stop animate');
      }
      animatedValue.current.setValue(0);
      animatedRef.current = Animated.timing(animatedValue.current, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: true,
      });
      animatedRef.current.start(resolve);
    });
  }, [animatedValue]);

  const setNextIndex = useCallback(() => {
    return setIndex(prevIndex => (prevIndex + 1) % languages.length);
  }, [languages]);

  useEffect(() => {
    if (count.current < languages.length) {
      const lang = languages[index];
      count.current++;
      Promise.all([
        startAnimatePromise(),
        ttsService.speak(lang.voice, lang.select),
      ]).then(setNextIndex);
    } else {
      startAnimatePromise().then(setNextIndex);
    }
  }, [startAnimatePromise, index, setNextIndex, languages]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      animatedRef.current?.stop();
    };
  }, []);

  const animatedStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.title,
      {
        opacity: animatedValue.current.interpolate({
          inputRange: [0, 0.1, 1],
          outputRange: [0, 1, 1],
        }),
      },
    ]) as TextStyle;
  }, [animatedValue]);

  return (
    <Animated.Text style={animatedStyle}>
      {languages[index].select}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default SelectLanguageTitle;
