import { getModule } from '../utils/getModule';

const RechargingManager = getModule('RechargingManager');

export function connectToStation(): Promise<void> {
  return RechargingManager.connectToStation();
}
