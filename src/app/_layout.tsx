import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LearningProvider, useLearning } from '../hooks/useLearning';
import { AccessibleButton, Txt, useColors } from '../components/ui';
function Shell() { const { ready, error, retry } = useLearning(); const c = useColors(); return <SafeAreaView style={{ flex: 1, backgroundColor: c.bg }}><Stack screenOptions={{ headerShown: false, animation: 'none' }} />{!ready && <Txt>Carregando seu aprendizado…</Txt>}{error ? <><Txt accessibilityRole="alert">{error}</Txt><AccessibleButton title="Tentar salvar novamente" onPress={retry} /></> : null}</SafeAreaView>; }
export default function Layout() { return <SafeAreaProvider><LearningProvider><Shell /></LearningProvider></SafeAreaProvider>; }
