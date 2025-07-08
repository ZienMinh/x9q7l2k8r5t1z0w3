import { getModule } from '../utils/getModule';

const SpeechManager = getModule('SpeechManager');

export function synthesize(text: string): Promise<void> {
  return SpeechManager.synthesize(text);
}
