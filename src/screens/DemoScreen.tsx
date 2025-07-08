import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet, TextInput, View } from 'react-native';
import {
  RobotManager,
  PowerManager,
  RechargingManager,
  SpeechManager,
  EmotionManager,
  MotionManager,
  LocomotionManager,
  CONSTANTS,
} from '../lib/cruzr';
import Button from '../components/Button';

export default function DemoScreen() {
  const [motion, setMotion] = useState('fowardd');

  useEffect(() => {
    RobotManager.init();
  }, []);

  const reset = useCallback(async () => {
    try {
      const result = await Promise.allSettled([
        EmotionManager.dismissEmotion(),
        MotionManager.resetAction(),
      ]);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const test = useCallback(async () => {
    try {
      const result = await Promise.allSettled([
        SpeechManager.synthesize('Goodbye DR Leo, See you later.'),
        EmotionManager.expressEmotion(CONSTANTS.EmotionUris.HAPPY),
        MotionManager.performAction(CONSTANTS.ActionUris.GOODBYE),
      ]);
      console.log(result);
    } catch (e) {
      console.log((e as any).message);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Button onPress={test} title="Parallax Call" />
        <Button onPress={reset} title="Reset Actions" />
        <Button
          onPress={RechargingManager.connectToStation}
          title="Connect Charge Dock"
        />
        <Button onPress={PowerManager.shutdown} title="Shutdown" />
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.rowCenter}>
          <Button
            onPress={() => LocomotionManager.moveStraightBy(0, 0.3)}
            title="↑ 0.5m"
          />
        </View>
        <View style={styles.rowCenter}>
          <Button onPress={() => LocomotionManager.turnBy(90)} title="↺ 90°" />
          <Button onPress={() => LocomotionManager.turnBy(-90)} title="↻ 90°" />
        </View>
        <TextInput
          value={motion}
          onChangeText={setMotion}
          placeholder="Custom"
        />
        <Button
          onPress={() =>
            MotionManager.performAction(`action://ubtrobot/${motion}`).catch(
              e => {
                console.warn(e.message);
              },
            )
          }
          title={`Perform ${motion} Action`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
  },
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  br: {
    height: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
