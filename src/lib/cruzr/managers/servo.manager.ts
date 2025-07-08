import { getModule } from '../utils/getModule';

const ServoManager = getModule('ServoManager');

type ServoDevice = {
  id: string;
  name: string;
  description: string;
  minAngle: number;
  maxAngle: number;
  minSpeed: number;
  maxSpeed: number;
  defaultSpeed: number;
};

export const getDeviceList = (): Promise<ServoDevice[]> => {
  return ServoManager.getDeviceList();
};

export const rotateTo = (
  servoId: string,
  angle: number,
  duration: number,
): Promise<void> => {
  return ServoManager.rotateTo(servoId, angle, duration);
};

export const isRotating = (servoId: string): Promise<boolean> => {
  return ServoManager.isRotating(servoId);
};

export const getAngle = (servoId: string): Promise<number> => {
  return ServoManager.getAngle(servoId);
};

export const release = (servoId: string): Promise<void> => {
  return ServoManager.release(servoId);
};

type RotateOption = {
  servoId: string;
  angle: number;
  duration: number;
};
export const rotateSerially = (options: RotateOption[]): Promise<void> => {
  return ServoManager.rotateSerially(options);
};
