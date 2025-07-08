/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import LangStateProvider from './src/providers/langstate.provider';
import RootStateProvider from './src/providers/rootstate.provider';
import { ToastProvider } from 'react-native-toast-notifications';
import { StatusBar, StyleSheet } from 'react-native';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/i18n';
import { AssistantManager, RobotManager } from './src/lib/cruzr';
import { checkTtsEngine } from './src/services/tts-service';
import 'moment/locale/en-au';
import 'moment/locale/ko';
import 'moment/locale/zh-cn';
import 'moment/locale/ru';
import 'moment/locale/vi';
import GlobalStateProvider from './src/providers/GlobalStateProvider';
import LoadingScreen from './src/screens/LoadingScreen';
import {
  ConfigProvider,
  useConfigContext,
} from './src/providers/ConfigProvider';

const App = () => {
  const [isCheckedTtsEngine, setIsCheckedTtsEngine] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const { isLoaded } = useConfigContext();

  useEffect(() => {
    StatusBar.setHidden(true);
    RobotManager.isRobot().then(setIsRobot);
  }, []);

  useEffect(() => {
    if (isRobot) {
      RobotManager.init();

      const interval = setInterval(() => {
        AssistantManager.hideAssistant(); // Turn off assistant
      }, 1000);

      return () => {
        clearInterval(interval);
        AssistantManager.showAssistant(); // Turn on assistant
      };
    }
  }, [isRobot]);

  useEffect(() => {
    checkTtsEngine().then(() => {
      setIsCheckedTtsEngine(true);
    });
  }, []);

  if (!isCheckedTtsEngine) {
    return null;
  }

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return <RootNavigation />;
};

const styles = StyleSheet.create({
  toast: {
    fontSize: 25,
  },
});

export default function () {
  return (
    <ConfigProvider>
      <GlobalStateProvider>
        <I18nextProvider i18n={i18n}>
          <RootStateProvider>
            <LangStateProvider>
              {/*
            // @ts-ignore*/}
              <ToastProvider textStyle={styles.toast}>
                <App />
              </ToastProvider>
            </LangStateProvider>
          </RootStateProvider>
        </I18nextProvider>
      </GlobalStateProvider>
    </ConfigProvider>
  );
}
