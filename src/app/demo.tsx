import React, { useState } from 'react';
import { BBPractice } from '../components/BBPractice';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { AccessibleButton, Card, Page, ProgressIndicator, Txt } from '../components/ui';
import { practiceTopics } from '../data/practiceTopics';
import { AudioButton } from '../components/AudioButton';

const content = {
  saldo: { title: 'Consultar saldo', explanation: 'Saldo disponível é o dinheiro que você pode usar. Limite de crédito é emprestado.', example: 'Ana tocou em Ver saldo. Ela tem R$ 850,00.', task: 'Toque em Ver saldo.' },
  ...practiceTopics,
  extrato: { title: 'Entender o extrato', explanation: 'O extrato mostra o que entrou e o que saiu da conta.', example: 'Entrou R$ 1.000,00. Saiu R$ 150,00. Restou R$ 850,00.', task: 'Abra o extrato. Escolha o dinheiro que entrou.' },
};

export default function Demo() {
  const { bank } = useLocalSearchParams<{ bank?: string }>();
  const [choosing, setChoosing] = useState(true);
  const [topic, setTopic] = useState<keyof typeof content>('saldo');
  const [stage, setStage] = useState(0);
  const [opened, setOpened] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [done, setDone] = useState(false);
  const lesson = content[topic];
  const extra = topic !== 'saldo' && topic !== 'extrato' ? practiceTopics[topic] : null;
  const reset = (next: keyof typeof content) => { setChoosing(false); setTopic(next); setStage(0); setOpened(false); setFeedback(''); setDone(false); };
  const answer = (correct: boolean) => { setDone(correct); setFeedback(extra ? (correct ? 'Isso! ' : 'Tente de novo. ') + extra.feedback : correct ? (topic === 'saldo' ? 'Isso! Você tem R$ 850,00.' : 'Isso! Entrou R$ 1.000,00.') : (topic === 'saldo' ? 'Tente de novo. Não some o crédito emprestado.' : 'Mercado é uma saída. Procure a entrada.')); };
  if (bank && bank !== 'bb') return <Redirect href="/demo?bank=bb" />;
  if (bank === 'bb') return <BBPractice />;
  if (!bank) return <Page title="Escolha seu banco"><AccessibleButton title="CAIXA — Em breve" disabled onPress={() => {}} /><AccessibleButton title="Banco do Brasil" onPress={() => router.replace('/demo?bank=bb')} /></Page>;
if (choosing) return <Page title="Vamos aprender?">
<AccessibleButton title="Ver saldo" icon="wallet-outline" onPress={() => reset('saldo')} />
<AccessibleButton title="Ver extrato" icon="list-outline" onPress={() => reset('extrato')} />
{Object.entries(practiceTopics).map(([key, item]) => <AccessibleButton key={key} title={item.title} icon="book-outline" onPress={() => reset(key as keyof typeof practiceTopics)} />)}
<AccessibleButton title="Mais guias" secondary onPress={() => router.push({ pathname: '/learn', params: { bank } })} />
<Txt style={{ fontSize: 16 }}>Só um treino. Sem dinheiro real.</Txt></Page>;
return <Page title={lesson.title} subtitle="Treino com valores fictícios.">
    <ProgressIndicator current={stage + 1} total={3} />
    <Txt accessibilityRole="header" style={{ fontSize: 25, fontWeight: '800' }}>{['Entenda', 'Exemplo', 'Sua vez'][stage]}</Txt>
    {stage < 2 ? <><Card><Txt>{stage === 0 ? lesson.explanation : lesson.example}</Txt><AudioButton text={stage === 0 ? lesson.explanation : lesson.example} /></Card><AccessibleButton title={stage === 0 ? 'Ver exemplo' : 'Praticar agora'} icon="arrow-forward" onPress={() => setStage(stage + 1)} /></> : <>
      <Txt>{lesson.task}</Txt>
      <Card><Txt style={{ fontSize: 15, fontWeight: '700' }}>CONTA DE TREINO</Txt><Txt accessibilityRole="header">Olá, Ana</Txt>
        {extra ? <>{extra.options.map((option, index) => <AccessibleButton key={option} title={option} secondary disabled={done} onPress={() => answer(index === extra.answer)} />)}</> : !opened ? <><AccessibleButton title="Ver saldo" secondary onPress={() => { if (topic === 'saldo') { setOpened(true); setFeedback(''); } else setFeedback('Tente Ver extrato.'); }} /><AccessibleButton title="Ver extrato" secondary onPress={() => { if (topic === 'extrato') { setOpened(true); setFeedback(''); } else setFeedback('Tente Ver saldo.'); }} /></> : topic === 'saldo' ? <><Txt>Saldo disponível</Txt><Txt style={{ fontSize: 34, fontWeight: '800' }}>R$ 850,00</Txt><Txt>Limite de crédito: R$ 500,00 (emprestado)</Txt><Txt>Qual é o saldo de Ana?</Txt><AccessibleButton title="R$ 850,00" disabled={done} onPress={() => answer(true)} /><AccessibleButton title="R$ 1.350,00" secondary disabled={done} onPress={() => answer(false)} /></> : <><Txt>Extrato de Ana</Txt><AccessibleButton title="Entrada: R$ 1.000,00" secondary disabled={done} onPress={() => answer(true)} /><AccessibleButton title="Saída: R$ 150,00" secondary disabled={done} onPress={() => answer(false)} /><Txt>Saldo: R$ 850,00</Txt></>}
      </Card>
      {!!feedback && <Card><Txt accessibilityLiveRegion="polite">{feedback}</Txt></Card>}
      {done && <><Txt accessibilityRole="header">Você conseguiu!</Txt><AccessibleButton title="Escolher outro assunto" onPress={() => setChoosing(true)} /><AccessibleButton title="Repetir" secondary onPress={() => reset(topic)} /></>}
    </>}
    {stage > 0 && <AccessibleButton title="Voltar uma etapa" secondary onPress={() => setStage(stage - 1)} />}
    <AccessibleButton title="Trocar assunto" secondary onPress={() => setChoosing(true)} />
  </Page>;
}




