import React, { useState } from 'react';
import { AccessibleButton as Button, Card, Page, ProgressIndicator, Txt } from './ui';
import { AudioButton } from './AudioButton';
import { BBVisual } from './BBVisual';
import { BBPixSimulator } from './BBPixSimulator';

type Guide = { title: string; meaning: string; steps: { text: string; button: string }[]; example: string };
const guides: Guide[] = [
 { title: 'Saldo', meaning: 'É o dinheiro disponível na sua conta.', steps: [{ text: 'Na tela inicial do BB, procure a palavra Saldo. Se o valor estiver escondido, toque no símbolo de olho.', button: 'Mostrar saldo' }], example: 'Exemplo: saldo de R$ 850,00 significa que há R$ 850,00 disponíveis. Limite de crédito não é dinheiro próprio.' },
 { title: 'Extrato', meaning: 'É a lista do dinheiro que entrou e saiu da conta.', steps: [{ text: 'Na tela inicial do BB, toque em Extrato.', button: 'Extrato' }, { text: 'Na tela de extrato, escolha o mês que deseja consultar.', button: 'Nov' }], example: 'Exemplo: recebimento de R$ 1.000,00 é uma entrada. Compra de R$ 150,00 é uma saída. Depois desses movimentos, restam R$ 850,00.' },
 { title: 'Pix', meaning: 'É uma forma de enviar e receber dinheiro entre contas.', steps: [{ text: 'Na tela inicial do BB, toque em Pix.', button: 'Pix' }, { text: 'Na Central Pix, a opção Fazer um Pix abre o caminho para escolher quem vai receber.', button: 'Fazer um Pix' }], example: 'A próxima tela pede uma chave Pix. Ela identifica o destinatário, como um e-mail ou uma chave aleatória. Exemplo fictício: maria@example.com. Antes de enviar no app real, confira o nome e o valor.' },
 { title: 'Transferência', meaning: 'É o envio de dinheiro de uma conta para outra.', steps: [{ text: 'Na tela inicial do BB, toque em Transferência.', button: 'Transferência' }], example: 'Em Nova transferência aparecem banco, tipo de conta, agência e conta. Esses dados indicam o destino do dinheiro. Exemplo fictício: agência 0000, conta 00000-0. Confira sempre o nome de quem recebe.' },
 { title: 'Minhas chaves Pix', meaning: 'São os identificadores usados para receber Pix na sua conta.', steps: [{ text: 'Na tela inicial do BB, toque em Pix.', button: 'Pix' }, { text: 'Na Central Pix, procure a parte Receber e toque em Minhas Chaves Pix.', button: 'Minhas Chaves Pix' }], example: 'Essa tela mostra as chaves cadastradas. Uma chave pode ser CPF, telefone, e-mail ou uma chave aleatória. Exemplo fictício de e-mail: ana@example.com.' },
 { title: 'Fatura do cartão', meaning: 'É a conta que reúne as compras feitas com o cartão de crédito.', steps: [{ text: 'Na tela inicial do BB, toque em Ver mais.', button: 'Ver mais' }, { text: 'Em Mais opções, toque em Cartão Fatura.', button: 'Cartão Fatura' }], example: 'Na tela Faturas você encontra o total, o vencimento e as compras. Exemplo: compras de R$ 80,00 e R$ 40,00 somam uma fatura de R$ 120,00. Vencimento é a data para pagar.' },
 { title: 'Limite do cartão', meaning: 'É o valor máximo de crédito disponível para usar no cartão.', steps: [{ text: 'Na tela inicial do BB, toque em Ver mais.', button: 'Ver mais' }, { text: 'Em Mais opções, toque em Cartão Limite.', button: 'Cartão Limite' }], example: 'Exemplo: limite total de R$ 1.000,00, com R$ 120,00 usados, deixa R$ 880,00 disponíveis. Esse crédito não é o saldo da conta nem o limite de Pix.' },
 { title: 'Pagar boleto', meaning: 'É pagar uma cobrança usando o código de barras ou os números do boleto.', steps: [{ text: 'Na tela inicial do BB, toque em Pagar.', button: 'Pagar' }, { text: 'A tela de leitura permite enquadrar o código de barras. Para informar os números, a opção é Digitar código.', button: 'Digitar código' }], example: 'O código identifica a cobrança. Exemplo: um boleto da Loja Exemplo no valor de R$ 50,00. No app real, confira o beneficiário, o valor e o vencimento antes de pagar.' },
 { title: 'Comprovante Pix', meaning: 'É o registro de uma operação realizada.', steps: [{ text: 'Depois de um Pix concluído no app, a tela Solicitação concluída mostra a opção Ver comprovante Pix.', button: 'Ver comprovante Pix' }], example: 'No comprovante, confira quem recebeu, o valor e a data. Exemplo fictício: R$ 20,00 para Maria Exemplo. Um agendamento não significa que o pagamento já foi concluído.' },
];

export function BBPractice() {
 const [selected, setSelected] = useState<Guide | null>(null);
 const [step, setStep] = useState(0);
 const menu = () => { setSelected(null); setStep(0); };
 if (!selected) return <Page title="O que você quer aprender?" subtitle="Toque em uma opção.">
 {guides.map(guide => <Button key={guide.title} title={guide.title} secondary onPress={() => { setSelected(guide); setStep(0); }} />)}
 </Page>;
 if (selected.title === 'Pix' || selected.title === 'Minhas chaves Pix') return <BBPixSimulator onExit={menu} keysFirst={selected.title === 'Minhas chaves Pix'} />;
 const complete = step === selected.steps.length;
 const text = complete ? selected.example : selected.steps[step].text;
 return <Page title={selected.title} subtitle="Guia de cliques no app do BB" back={false}>
 <Button title="Voltar aos menus" icon="arrow-back" secondary onPress={menu} />
 <Card><Txt style={{ fontWeight: '800' }}>O que significa?</Txt><Txt>{selected.meaning}</Txt></Card>
 <Txt style={{ fontWeight: '800' }}>{complete ? 'O que você vai encontrar' : 'Onde tocar'}</Txt>
 <Txt>{text}</Txt>
 {!complete && <ProgressIndicator current={step + 1} total={selected.steps.length} />}
 <BBVisual topic={selected.title} step={step} complete={complete} target={complete ? undefined : selected.steps[step].button} onNext={() => setStep(step + 1)} />
 <AudioButton key={`${selected.title}-${step}`} text={`${selected.meaning} ${text}`} />
 {step > 0 && <Button title="Voltar um passo" secondary onPress={() => setStep(step - 1)} />}
 {complete && <Button title="Ver o caminho de novo" onPress={() => setStep(0)} />}
 <Txt style={{ fontSize: 15 }}>Exemplos com dados fictícios. Os menus podem variar conforme a versão do aplicativo.</Txt>
 </Page>;
}



