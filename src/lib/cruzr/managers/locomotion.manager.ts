import { getModule } from '../utils/getModule';

const LocomotionManager = getModule('LocomotionManager');

export function moveStraightBy(angle: number, distance: number): Promise<void> {
  return LocomotionManager.moveStraightBy(angle, distance);
}

export function turnBy(angle: number): Promise<void> {
  return LocomotionManager.turnBy(angle);
}
