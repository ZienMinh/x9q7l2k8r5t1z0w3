import { EmotionUris, ActionUris } from './constants';
import * as RobotManager from './managers/robot.manager';
import * as PowerManager from './managers/power.manager';
import * as EmotionManager from './managers/emotion.manager';
import * as SpeechManager from './managers/speech.manager';
import * as LocomotionManager from './managers/locomotion.manager';
import * as MotionManager from './managers/motion.manager';
import * as RechargingManager from './managers/recharging.manager';
import * as AssistantManager from './managers/assistant.manager';
import * as ServoManager from './managers/servo.manager';

const CONSTANTS = {
  EmotionUris,
  ActionUris,
};

export {
  RobotManager,
  PowerManager,
  EmotionManager,
  SpeechManager,
  LocomotionManager,
  MotionManager,
  RechargingManager,
  AssistantManager,
  ServoManager,
  CONSTANTS,
};
