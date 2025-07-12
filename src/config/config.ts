import { StoreItem } from '../types';

enum ROUTER {
  LANGUAGE_SCREEN = 'LANGUAGE_SCREEN',
  HOME_SCREEN = 'HOME_SCREEN',
  AIRPORT_SCREEN = 'AIRPORT_SCREEN',
  MAP_SCREEN = 'MAP_SCREEN',
  DIRECTION_SCREEN = 'DIRECTION_SCREEN',
  STORE_SCREEN = 'STORE_SCREEN',
  NAVIGATE_SCREEN = 'NAVIGATE_SCREEN',
  SECURITY_SCREEN = 'SECURITY_SCREEN',
  SYNC_DATA_SCREEN = 'SYNC_DATA_SCREEN',
  STORE_MENU_SCREEN = 'STORE_MENU_SCREEN',
  EMOTION_SCREEN = 'EMOTION_SCREEN',
  ONBOARDING_GUIDE_SCREEN = 'ONBOARDING_GUIDE_SCREEN',
}

export const Config = {
  ROUTER,
  SYNC_API_URL: 'http://cruzr-data.svnet.xyz',
  GO_TO_HOME_TIMEOUT: 12000,
};

export type StackParamList = {
  [Config.ROUTER.LANGUAGE_SCREEN]: {};
  [Config.ROUTER.HOME_SCREEN]: {};
  [Config.ROUTER.AIRPORT_SCREEN]: {};
  [Config.ROUTER.MAP_SCREEN]: {};
  [Config.ROUTER.DIRECTION_SCREEN]: {};
  [Config.ROUTER.SECURITY_SCREEN]: {};
  [Config.ROUTER.SYNC_DATA_SCREEN]: {};
  [Config.ROUTER.STORE_SCREEN]: {
    key: 'shopping' | 'food&drink';
  };
  [Config.ROUTER.NAVIGATE_SCREEN]: {
    instruction: {
      text: string;
      videoURL: string;
      actions?: string;
    };
  };
  [Config.ROUTER.STORE_MENU_SCREEN]: {
    store: StoreItem;
  };
  [Config.ROUTER.EMOTION_SCREEN]: {};
};
