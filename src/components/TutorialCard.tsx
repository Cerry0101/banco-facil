import React from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Lesson } from '../types';
import { useLearning } from '../hooks/useLearning';
import { AccessibleButton, Card, Txt, useColors } from './ui';
export function TutorialCard({ lesson }: { lesson: Lesson }) { const { state, update } = useLearning(); const p = state.progress[lesson.id]; const favorite = state.favorites.includes(lesson.id); const c = useColors(); return <Card><Ionicons name={lesson.icon as React.ComponentProps<typeof Ionicons>['name']} size={30} color={c.primary} /><Txt accessibilityRole="header" style={{ fontWeight: '800', fontSize: 24 }}>{lesson.title}</Txt><Txt style={{ color: p?.completed ? c.success : c.muted }}>3 min · {p?.completed ? 'Concluído' : p?.started ? 'Em andamento' : 'Novo'}</Txt><AccessibleButton title={p?.started && !p.completed ? 'Continuar' : 'Aprender'} onPress={() => router.push({ pathname: '/tutorial/[id]', params: { id: lesson.id } })} /><AccessibleButton title={favorite ? 'Remover favorito' : 'Favoritar'} icon={favorite ? 'bookmark' : 'bookmark-outline'} secondary onPress={() => update(s => ({ ...s, favorites: favorite ? s.favorites.filter(id => id !== lesson.id) : [...s.favorites, lesson.id] }))} /></Card>; }
