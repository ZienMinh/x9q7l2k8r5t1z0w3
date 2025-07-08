import Tts, { Voice } from 'react-native-tts';

class TtsService {
  #isSpeaking: boolean = false;
  static #hasEngine: boolean = false;
  static #offlineVoices: Voice[] = [];

  public async speak(language: string, text: string): Promise<void> {
    console.log('TtsService.speak', language, text);
    if (!this.enable || !TtsService.#hasEngine) {
      console.log('TtsService.speak: disabled or no engine found');
      return Promise.resolve();
    }
    await this.setLanguage(language);
    if (this.#isSpeaking) {
      await this.stop();
    }
    return new Promise(resolve => {
      this.#isSpeaking = true;
      Tts.speak(text);
      const onStart = () => {
        this.#isSpeaking = true;
        Tts.removeEventListener('tts-start', onStart);
      };
      const onStop = () => {
        Tts.removeEventListener('tts-finish', onStop);
        Tts.removeEventListener('tts-error', onStop);
        this.#isSpeaking = false;
        resolve();
      };
      Tts.addEventListener('tts-start', onStart);
      Tts.addEventListener('tts-finish', onStop);
      Tts.addEventListener('tts-error', onStop);
    });
  }

  public async stop(): Promise<void> {
    if (this.#isSpeaking) {
      await Tts.stop();
      this.#isSpeaking = false;
    }
  }

  private async setLanguage(language: string): Promise<void> {
    // const voiceId = TtsService.#offlineVoices.find(
    //   voice => voice.language === language,
    // )?.id;
    await Tts.setDefaultLanguage(language);
    // if (voiceId) {
    //   await Tts.setDefaultVoice(voiceId);
    // }
  }

  public static async checkEngine(): Promise<boolean> {
    try {
      await Tts.getInitStatus();
      const engines = await Tts.engines();
      console.log('engines', engines);
      TtsService.#hasEngine = engines.length > 0;
      if (TtsService.#hasEngine) {
        const voices = await Tts.voices();
        TtsService.#offlineVoices = voices.filter(
          voice => !voice.networkConnectionRequired,
        );
      }
    } catch (e) {
      console.log('TtsService.checkEngine', (e as Error).message);
    }

    return TtsService.#hasEngine;
  }

  constructor(private enable: boolean) {}
}

export const ttsService = new TtsService(true);
export const checkTtsEngine = TtsService.checkEngine;
