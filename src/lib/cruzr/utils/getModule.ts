import { NativeModules, Platform } from 'react-native';

const getLinkingError = (moduleName: string) => {
  return (
    `The module ${moduleName} doesn't seem to be linked. Make sure: \n\n` +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo managed workflow\n'
  );
};

export const getModule = (moduleName: string) => {
  return NativeModules[moduleName]
    ? NativeModules[moduleName]
    : new Proxy(
        {},
        {
          get() {
            throw new Error(getLinkingError(moduleName));
          },
        },
      );
};
