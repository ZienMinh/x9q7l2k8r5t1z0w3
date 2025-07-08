import { ServoManager } from '..';
import { ActionUris } from '../constants';
import { getModule } from '../utils/getModule';

const MotionManager = getModule('MotionManager');

export function performAction(
  actionId: typeof ActionUris[keyof typeof ActionUris],
): Promise<void> {
  return MotionManager.performAction(actionId);
}

export function resetAction(): Promise<void> {
  return MotionManager.resetAction();
}

function deplayPromise(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function guideLeft(): Promise<void> {
  console.log('guideLeft() called - resetting action');
  await MotionManager.resetAction();
  console.log('guideLeft() called - delay action');
  await deplayPromise(300);
  console.log('guideLeft() called - guide action');
  await ServoManager.rotateSerially([
    // {
    //   servoId: 'LShoulderPitch',
    //   angle: 90,
    //   duration: 1500,
    // },
    {
      servoId: 'LShoulderRoll',
      angle: 90,
      duration: 1500,
    },
    // {
    //   servoId: 'LShoulderYaw',
    //   angle: 90,
    //   duration: 1500,
    // },
  ]);

  console.log('guideLeft() called - delay action');
  await deplayPromise(300);
  console.log('guideLeft() called - resetting action');
  await MotionManager.resetAction();
  console.log('guideLeft() called - done!!!!!');
}
