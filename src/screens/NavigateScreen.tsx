import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { Config, StackParamList } from '../config/config';
import { CONSTANTS, MotionManager, RobotManager } from '../lib/cruzr';
import { useHeaderContext } from '../providers/HeaderProvider';
import { ttsService } from '../services/tts-service';
import { useNavigation } from '../hooks/useNavigation';
import WebView from 'react-native-webview';
import { useConfigContext } from '../providers/ConfigProvider';

export type NavigateScreenProps = RouteProp<
  StackParamList,
  typeof Config['ROUTER']['NAVIGATE_SCREEN']
>;

const NavigateScreen: React.FC = () => {
  const { params } = useRoute<NavigateScreenProps>();
  const { instruction } = params;
  // @ts-ignore
  const [tLang] = useTranslation('lang');
  const setHeader = useHeaderContext();
  const navigation = useNavigation();
  const { config } = useConfigContext();

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const performActionIfIsRobot = useCallback(
    async (action: Parameters<typeof MotionManager['performAction']>[0]) => {
      try {
        const isRobot = await RobotManager.isRobot();
        if (!isRobot) {
          return Promise.resolve();
        }
        return await MotionManager.performAction(action);
      } catch (e) {
        console.log(e);
      }
    },
    [],
  );

  useEffect(() => {
    (async function () {
      const actions = instruction?.actions?.split(',') || [];

      const performActionTasks = async () => {
        for (const action of actions) {
          await performActionIfIsRobot(
            config!.motion[
              action as keyof NonNullable<typeof config>['motion']
            ] || action,
          );
        }
      };

      const guideTasks = [
        ttsService.speak(tLang('voice'), instruction.text),
        performActionTasks(),
      ];
      console.log('NavigateScreen: guideTasks', guideTasks);
      await Promise.allSettled(guideTasks);
      console.log('NavigateScreen: guideTasks done');
      await performActionIfIsRobot(CONSTANTS.ActionUris.RESET);
      console.log('NavigateScreen: reset done');
    })();
  }, [performActionIfIsRobot, tLang, instruction, config]);

  useEffect(() => {
    setHeader({
      title: '',
      canGoBack: true,
      hidden: true,
    });
  }, [setHeader]);

  const htmlSource = useMemo(
    () => ({
      html: `<html>
        <style>
          html,
          body {
            padding: 0;
            margin: 0;
            background-color: #000;
          }
          video {
            width: 100%;
          }
        </style>
        <video
          autoplay
          playsInline
          loop
          src="${instruction.videoURL}"
        ></video>
      </html>
      `,
    }),
    [instruction.videoURL],
  );

  console.log('vidoe', instruction.videoURL);

  return (
    <Pressable onPress={goBack} style={styles.container}>
      <View style={styles.gifContainer}>
        {/* <FastImage source={imageSource} style={styles.gif} /> */}
        <WebView
          style={styles.gif}
          allowFileAccessFromFileURLs={true}
          allowFileAccess={true}
          mediaPlaybackRequiresUserAction={false}
          allowsInlineMediaPlayback={true}
          source={htmlSource}
        />
      </View>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>{instruction.text}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gifContainer: {
    flex: 1,
  },
  gif: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  instructionContainer: {
    alignItems: 'center',
    // paddingBottom: 10,
    // paddingTop: 15,
    paddingHorizontal: 40,
    backgroundColor: 'rgba(46, 46, 46,1)',
    height: 100,
    justifyContent: 'center',
  },
  instructionText: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
});

export default NavigateScreen;
