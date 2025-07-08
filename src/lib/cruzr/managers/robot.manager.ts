import { getModule } from '../utils/getModule';

const RobotManager = getModule('RobotManager');

export const init = (): void => {
  RobotManager.init();
};

export const isRobot = (): Promise<boolean> => {
  return RobotManager.isRobot();
};

export const getWifiIpAddress = (): Promise<string> => {
  return RobotManager.getWifiIpAddress();
};

export const getRobotId = (): Promise<string> => {
  return RobotManager.getRobotId();
};

export const restartApplication = (): void => {
  return RobotManager.restartApplication();
};

export const getPassword = (): Promise<string | null> => {
  return RobotManager.getPassword();
};
