import * as Speech from 'expo-speech';
export function narrate(text: string, onError: () => void, onDone?: () => void) { Speech.stop(); Speech.speak(text, { language: 'pt-BR', rate: 0.85, onError, onDone, onStopped: onDone }); }
export const stopNarration = () => Speech.stop();
