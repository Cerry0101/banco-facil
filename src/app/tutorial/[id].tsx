import React, { useEffect, useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import * as Crypto from 'expo-crypto';
import { lessons } from '../../data/tutorials';
import { useLearning } from '../../hooks/useLearning';
import { AccessibleButton, Page, ProgressIndicator, Txt } from '../../components/ui';
import { TutorialStep } from '../../components/TutorialStep';
import { LearningActivity } from '../../components/LearningActivity';
import { narrate, stopNarration } from '../../services/speech';
export default function Tutorial() { const { id } = useLocalSearchParams<{ id: string }>(); const lesson = lessons.find(l => l.id === id); const { state, ready, update } = useLearning(); const [index, setIndex] = useState<number | null>(null); const [done, setDone] = useState(false); const [voiceError, setVoiceError] = useState(false); const completed = useRef(false); const started = useRef(Date.now()); const metric = useRef({ session: Crypto.randomUUID(), attempts: 0, errors: 0, help: 0 });
  useEffect(() => { if (!ready || !lesson || index !== null) return; const p = state.progress[lesson.id]; setIndex(p?.completed ? 0 : Math.min(p?.step ?? 0, lesson.steps.length)); started.current = Date.now(); update(s => ({ ...s, progress: { ...s.progress, [lesson.id]: { step: p?.completed ? 0 : p?.step ?? 0, started: true, completed: p?.completed ?? false, activity: p?.activity ?? false } } })); }, [ready, lesson, index]);
  useEffect(() => { if (lesson && index !== null && index < lesson.steps.length && state.preferences.narration) narrate(lesson.steps[index].text, () => setVoiceError(true)); return () => { stopNarration(); }; }, [lesson, index, state.preferences.narration]);
  useEffect(() => {
    if (!ready || !lesson) return;
    const snapshot = () => {
      const result = { ...metric.current, lesson: lesson.id, seconds: Math.round((Date.now() - started.current) / 1000), completed: completed.current };
      update(s => ({ ...s, results: [...s.results.filter(r => r.session !== result.session), result] }));
    };
    snapshot();
    return snapshot;
  }, [ready, lesson]);
  if (!lesson) return <Page title="Tutorial não encontrado"><AccessibleButton title="Escolher um banco" onPress={() => router.replace('/banks')} /></Page>;
  if (index === null) return <Page title="Preparando seu tutorial…"><Txt>Aguarde um instante.</Txt></Page>;
  const go = (next: number) => { setIndex(next); update(s => { const previous = s.progress[lesson.id]; return { ...s, progress: { ...s.progress, [lesson.id]: { ...previous, started: true, step: next, completed: previous?.completed || next === lesson.steps.length, activity: previous?.activity ?? false } } }; }); };
  const saveResult = (completed = false) => { const result = { ...metric.current, lesson: lesson.id, seconds: Math.round((Date.now() - started.current) / 1000), completed }; update(s => ({ ...s, results: [...s.results.filter(r => r.session !== result.session), result] })); };
  const finish = () => { completed.current = true; saveResult(true); update(s => ({ ...s, progress: { ...s.progress, [lesson.id]: { step: lesson.steps.length, started: true, completed: true, activity: true } } })); setDone(true); };
  return <Page key={`${index}-${done}`} title={lesson.title} subtitle="Exemplo. Sem dinheiro real.">{voiceError && <Txt accessibilityRole="alert">Narração indisponível. Você pode continuar lendo a explicação.</Txt>}{done ? <><Txt accessibilityRole="header">Muito bem! Você concluiu.</Txt><AccessibleButton title="Ver meu aprendizado" onPress={() => router.replace('/progress')} /><AccessibleButton title="Repetir tutorial" secondary onPress={() => { completed.current = false; metric.current = { session: Crypto.randomUUID(), attempts: 0, errors: 0, help: 0 }; started.current = Date.now(); setDone(false); go(0); }} /></> : index < lesson.steps.length ? <><ProgressIndicator current={index + 1} total={lesson.steps.length} /><TutorialStep key={index} step={lesson.steps[index]} onHelp={() => { metric.current.help++; saveResult(); }} /><AccessibleButton title={index === lesson.steps.length - 1 ? 'Praticar agora' : 'Próximo passo'} icon="arrow-forward" onPress={() => go(index + 1)} /><AccessibleButton title="Etapa anterior" secondary disabled={index === 0} onPress={() => go(index - 1)} /></> : <><LearningActivity lesson={lesson} onAttempt={correct => { metric.current.attempts++; if (!correct) metric.current.errors++; saveResult(); }} onFinish={finish} /><AccessibleButton title="Rever tutorial" secondary onPress={() => go(0)} /></>}</Page>;
}



