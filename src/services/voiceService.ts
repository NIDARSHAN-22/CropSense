/**
 * Vernacular Voice Synthesis Service for Low-Literacy Farmers
 * Speaks diagnoses, symptoms, and organic remedies in native regional Indian languages.
 */

const LANGUAGE_BCP47_MAP: Record<string, string[]> = {
  hi: ['hi-IN', 'hi', 'hin'],
  ta: ['ta-IN', 'ta-LK', 'ta'],
  te: ['te-IN', 'te'],
  kn: ['kn-IN', 'kn'],
  mr: ['mr-IN', 'mr'],
  bn: ['bn-IN', 'bn-BD', 'bn'],
  en: ['en-IN', 'en-GB', 'en-US', 'en'],
};

class VoiceService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  public isSpeaking = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (this.synth) {
      this.voices = this.synth.getVoices();
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public speak(
    text: string,
    langCode: string,
    onStart?: () => void,
    onEnd?: () => void
  ): boolean {
    if (!this.synth) return false;

    // Cancel any ongoing speech
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLocales = LANGUAGE_BCP47_MAP[langCode] || ['en-US'];

    if (this.voices.length === 0) {
      this.loadVoices();
    }

    // Select the best regional voice matching language code (e.g. ta-IN, hi-IN)
    const matchedVoice = this.voices.find((v) =>
      targetLocales.some((loc) => v.lang.toLowerCase().replace('_', '-').startsWith(loc.toLowerCase()))
    );

    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
    utterance.lang = targetLocales[0];
    utterance.rate = 0.90; // Natural, measured pace for farm advisory clarity
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
      onStart?.();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    utterance.onerror = (e) => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      onEnd?.();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    return true;
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
    }
  }
}

export const voiceService = new VoiceService();
