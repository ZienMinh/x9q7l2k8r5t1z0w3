/**
 * @format
 */
import './src/lib/polyfill';
import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  "EventEmitter.removeListener('tts-finish'",
  "EventEmitter.removeListener('tts-error'",
  "EventEmitter.removeListener('tts-cancel'",
  "EventEmitter.removeListener('tts-start'",
  '`new NativeEventEmitter()`',
]);

AppRegistry.registerComponent(appName, () => App);
