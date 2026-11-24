import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalState } from '../types';
export const initialState: LocalState = { preferences: { font: 1, narration: false, contrast: false, reduceMotion: true }, progress: {}, favorites: [], results: [] };
const KEY = '@banco-facil/v1';
export async function readLocal(): Promise<LocalState> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return initialState;
  const value = JSON.parse(raw) as LocalState;
  if (!value || !value.preferences || !value.progress || !Array.isArray(value.favorites) || !Array.isArray(value.results)) throw new Error('Formato inválido');
  if (![1, 1.2, 1.4].includes(value.preferences.font)) value.preferences.font = 1;
  return value;
}
export const writeLocal = (state: LocalState) => AsyncStorage.setItem(KEY, JSON.stringify(state));
