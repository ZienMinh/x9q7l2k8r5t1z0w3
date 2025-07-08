import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';

import { ttsService } from '../services/tts-service';
import { StoreItemTypes } from '../screens/StoreScreen';

type Props = {
  content: StoreItemTypes | null;
  onClose: () => void;
};

const DirectionsMap: React.FC<Props> = props => {
  const [t] = useTranslation('directions');
  const [tLang] = useTranslation('lang');
  // const places1 = t('places.group1', { returnObjects: true });
  // const places2 = t('places.group2', { returnObjects: true });

  const closeModal = useCallback(() => {
    props.onClose();
  }, [props]);

  // const performActionIfIsRobot = useCallback(
  //   (action: Parameters<typeof MotionManager['performAction']>[0]) => {
  //     if (!RobotManager.isRobot()) {
  //       return Promise.resolve();
  //     }
  //     return MotionManager.performAction(action);
  //   },
  //   [],
  // );

  // const onPlacePressed = useCallback(
  //   async (instruction: string) => {
  //     setModalContent({
  //       content: instruction,
  //       isVisible: true,
  //     });
  //     await performActionIfIsRobot(CONSTANTS.ActionUris.RESET);
  //     const guideTasks = [
  //       ttsService.speak(tLang('voice'), instruction),
  //       performActionIfIsRobot(CONSTANTS.ActionUris.GUIDE_RIGHT),
  //     ];
  //     await Promise.allSettled(guideTasks);
  //     if (RobotManager.isRobot()) {
  //       await performActionIfIsRobot(CONSTANTS.ActionUris.RESET);
  //     }
  //   },
  //   [performActionIfIsRobot, tLang],
  // );

  useEffect(() => {
    if (props.content) {
      ttsService.speak(tLang('voice'), props.content.instruction).then(() => {
        props.onClose();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.content]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      visible={!!props.content}>
      <TouchableOpacity style={styles.modal} onPress={closeModal}>
        <StatusBar hidden />
        <TouchableWithoutFeedback>
          <View style={styles.modal_area}>
            <View style={styles.view_text}>
              <Text style={styles.content_text}>
                {props.content?.instruction}
              </Text>
            </View>
            <View style={styles.view_gif}>
              <Image
                source={{
                  // uri: 'https://idkblogs.com/images/angular2/agm-moving-direction/moving-direction2.gif',
                  uri: 'https://cdn.huongnghiepaau.com/wp-content/uploads/2020/11/gps-based-map-app.gif',
                }}
                style={styles.gif_img}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-around',
  },
  colContainer: {
    width: Dimensions.get('window').width / 2 - 60,
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },

  pos_press: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  modal: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },

  modal_area: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(46, 46, 46,0.95)',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    elevation: 5,
    paddingBottom: 10,
  },

  gif_img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  content_text: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  view_text: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 15,
  },
  view_gif: {
    flex: 5,
  },
});

export default DirectionsMap;
