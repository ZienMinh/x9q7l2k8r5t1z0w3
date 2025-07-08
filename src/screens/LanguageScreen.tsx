import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import SelectLanguageBlock from '../components/SelectLanguage/SelectLanguageBlock';
import SelectLanguageTitle from '../components/SelectLanguage/SelectLanguageTitle';
import Spacer from '../components/Spacer';
import { useHeaderContext } from '../providers/HeaderProvider';
import { MotionManager, CONSTANTS } from '../lib/cruzr';
// import { MotionManager } from '../lib/cruzr';

const LanguageScreen = () => {
  // @ts-ignore
  const [t, i18n] = useTranslation('lang');
  const setHeader = useHeaderContext();

  const languages = useMemo(() => {
    return (i18n.options.supportedLngs || [])
      .filter((supportedLng: string) => supportedLng !== 'cimode')
      .map((supportedLng: string) => ({
        lang: supportedLng,
        title: t('title', { lng: supportedLng }),
        flag: t('flag', { lng: supportedLng }),
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // ServoManager.getDeviceList().then(MotionManager.guideLeft);
    // MotionManager.performAction(
    //   'action://ubtrobot/10d3827ebe3eec6f5db3f0cc6ebac7461659577853097',
    // );
    // MotionManager.resetAction();

    setHeader({
      hidden: false,
      canGoBack: false,
      title: '',
    });
    // perform goodbye action when entering language screen
    MotionManager.performAction(CONSTANTS.ActionUris.GOODBYE).catch(err =>
      console.warn('Goodbye action on language screen failed', err),
    );
  }, [setHeader]);

  return (
    <ScreenContainer justifyContent="center">
      <SelectLanguageTitle />
      <Spacer height={10} />
      <View style={styles.langContainer}>
        {languages.map(item => {
          return (
            <SelectLanguageBlock
              title={item.title}
              flag={item.flag}
              key={item.lang}
              lang={item.lang}
            />
          );
        })}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    color: '#4285f4',
    fontWeight: '700',
  },
  langContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LanguageScreen;
