import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { LocalState } from '../types';
import { initialState, readLocal, writeLocal } from '../storage/local';
type Context = { state: LocalState; ready: boolean; error: string; update: (fn: (state: LocalState) => LocalState) => void; retry: () => void };
const LearningContext = createContext<Context | null>(null);
export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initialState);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const queue = useRef(Promise.resolve());
  const latest = useRef(state);
  useEffect(() => { readLocal().then(value => { latest.current = value; setState(value); }).catch(() => setError('Não foi possível ler seus dados salvos. Você pode continuar, mas evite fechar o aplicativo antes de salvar.')).finally(() => setReady(true)); }, []);
  const persist = (value: LocalState) => {
    queue.current = queue.current.catch(() => {}).then(() => writeLocal(value)).then(() => setError('')).catch(() => setError('Não foi possível salvar. Verifique o espaço do aparelho e tente novamente.'));
  };
  const update = (fn: (value: LocalState) => LocalState) => { const next = fn(latest.current); latest.current = next; setState(next); persist(next); };
  return <LearningContext.Provider value={{ state, ready, error, update, retry: () => persist(latest.current) }}>{children}</LearningContext.Provider>;
}
export function useLearning() { const context = useContext(LearningContext); if (!context) throw new Error('LearningProvider ausente'); return context; }
