import React from 'react';
import { router } from 'expo-router';
import { AccessibleButton, Page } from '../components/ui';
import { BankCard } from '../components/BankCard';
import { banks } from '../data/tutorials';
export default function Welcome() {
 return <Page title="Escolha seu banco" back={false}>
  {banks.map(bank => <BankCard key={bank.id} bank={bank} />)}
  <AccessibleButton title="Ajustar letras e áudio" secondary icon="accessibility-outline" onPress={() => router.push('/settings')} />
 </Page>;
}


