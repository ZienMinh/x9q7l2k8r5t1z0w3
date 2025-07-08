import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Config } from '../../config/config';
import { useNavigation } from '../../hooks/useNavigation';
import Pressable from '../Pressable';
import vietnam from '../../assets/images/flags/vietnam.png';
import uk from '../../assets/images/flags/uk.png';
import russia from '../../assets/images/flags/russia.png';
import china from '../../assets/images/flags/china.png';
import korea from '../../assets/images/flags/korea.png';
import moment from 'moment';

const flags = {
  vietnam,
  uk,
  russia,
  china,
  korea,
};

type Props = {
  lang: string;
  title: string;
  flag: string;
};

const momentLangs: Record<string, string> = {
  vi: 'vi',
  en: 'en-au',
  ru: 'ru',
  cn: 'zh-cn',
  kr: 'ko',
};

const SelectLanguageBlock: React.FC<Props> = ({ title, flag, lang }) => {
  const navigation = useNavigation();
  const [, i18n] = useTranslation();

  const changeLanguage = useCallback(() => {
    moment.locale(momentLangs[lang]);
    return i18n.changeLanguage(lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const onPress = useCallback(() => {
    changeLanguage();
    navigation.replace(Config.ROUTER.HOME_SCREEN, {});
  }, [changeLanguage, navigation]);

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.flagContainer}>
          <Image
            source={flags[flag as unknown as keyof typeof flags]}
            style={styles.flag}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: Dimensions.get('window').width / 2 - 140,
    marginHorizontal: 15,
    marginVertical: 15,
    alignItems: 'center',
    elevation: 10,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 34,
    color: '#3d4043',
  },
  flagContainer: {
    width: 150,
  },
  flag: {
    height: 150 / 1.49812734082,
    width: 150,
  },
});

export default SelectLanguageBlock;
