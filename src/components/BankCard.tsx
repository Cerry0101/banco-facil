import React from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { banks } from '../data/tutorials';
import { Txt } from './ui';
import { useLearning } from '../hooks/useLearning';
export function BankCard({ bank }: { bank: typeof banks[number] }) {
const { state } = useLearning(); const bb = bank.id === 'bb';
const bg = state.preferences.contrast ? '#101010' : bb ? '#FFE033' : '#0066AE';
const fg = state.preferences.contrast ? '#FFFFFF' : bb ? '#12336F' : '#FFFFFF';
return <Pressable accessibilityRole="button" disabled={!bb} accessibilityState={{ disabled: !bb }} accessibilityLabel={bb ? 'Aprender com ' + bank.name : 'CAIXA — Em breve, indisponível'} onPress={() => router.push({ pathname: '/demo', params: { bank: bank.id } })} style={({ pressed }) => ({ backgroundColor: bg, borderRadius: 24, padding: 26, minHeight: 140, borderWidth: 2, borderColor: fg, opacity: !bb ? 0.45 : pressed ? 0.8 : 1, flexDirection: 'row', alignItems: 'center', gap: 20 })}>
<Ionicons name="business-outline" size={42} color={fg} /><View style={{ flex: 1 }}><Txt style={{ color: fg, fontWeight: '800', fontSize: 26 }}>{bb ? 'Banco do Brasil' : 'CAIXA'}</Txt><Txt style={{ color: fg, fontSize: 17 }}>{bb ? 'Começar' : 'Em breve'}</Txt></View><Ionicons name="arrow-forward" size={26} color={fg} /></Pressable>; }

