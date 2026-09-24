import { Language } from '../types';

export const LANGUAGE_LOCALE_MAP: Record<Language, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  bn: 'bn-IN',
  mr: 'mr-IN'
};

/**
 * Text to Speech utility with fallback
 */
export function speakText(text: string, language: Language = 'en'): Promise<void> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // stop any current audio

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = LANGUAGE_LOCALE_MAP[language] || 'en-IN';
    utterance.rate = 0.95; // Slightly slower for clear village/rural understanding
    utterance.pitch = 1.0;

    // Look for matching native voices if available
    const voices = window.speechSynthesis.getVoices();
    const targetLangPrefix = LANGUAGE_LOCALE_MAP[language].split('-')[0];
    const matchingVoice = voices.find((v) => v.lang.startsWith(targetLangPrefix));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Speech Recognition abstraction
 */
export function startVoiceRecognition(
  language: Language,
  onResult: (text: string) => void,
  onError: (err: string) => void
): { stop: () => void } | null {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError('Speech recognition not supported in your browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = LANGUAGE_LOCALE_MAP[language] || 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event: any) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    }
  };

  recognition.onerror = (event: any) => {
    onError(event.error || 'Voice input error');
  };

  try {
    recognition.start();
  } catch (err: any) {
    onError(err.message || 'Could not start microphone');
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch {
        // safe
      }
    }
  };
}
