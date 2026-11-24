import React from 'react';
import { router } from 'expo-router';
import { AccessibleButton, Page } from '../components/ui';
export default function NotFound() { return <Page title="Não encontramos esta tela"><AccessibleButton title="Ir ao início" onPress={() => router.replace('/')} /></Page>; }
