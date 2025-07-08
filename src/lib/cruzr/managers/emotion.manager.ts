import { EmotionUris } from '../constants';
import { getModule } from '../utils/getModule';

const EmotionManager = getModule('EmotionManager');

export function expressEmotion(
  emotionId: typeof EmotionUris[keyof typeof EmotionUris],
): Promise<void> {
  return EmotionManager.expressEmotion(emotionId);
}

export function dismissEmotion(): Promise<void> {
  return EmotionManager.dismissEmotion();
}
