import { BankId, Lesson, Step } from '../types';
export const banks: { id: BankId; name: string; short: string; color: string }[] = [
  { id: 'bb', name: 'Banco do Brasil', short: 'BB', color: '#685300' },
  { id: 'caixa', name: 'Caixa Econômica Federal', short: 'CAIXA', color: '#07589A' },
];
const step = (title: string, text: string, simple: string, focus: string, items: string[]): Step => ({ title, text, simple, focus, items });
const topics = [
  { key: 'acesso', title: 'Abrir o aplicativo', icon: 'log-in', description: 'Conheça os cuidados antes de abrir seu banco.', focus: 'Aplicativo verificado', text: 'Confira o aplicativo com o banco. Evite links de mensagens.', simple: 'Não abra o banco por um link de mensagem. Peça orientação em um canal oficial para conferir o aplicativo.', options: ['Abrir um link desconhecido', 'Conferir pelos canais oficiais', 'Informar minha senha aqui'], answer: 1, question: 'Como conferir se o aplicativo é o correto?' },
  { key: 'saldo', title: 'Consultar saldo', icon: 'wallet', description: 'Entenda quanto está disponível na conta.', focus: 'Consultar saldo', text: 'Saldo é o dinheiro disponível. Veja a opção destacada neste exemplo.', simple: 'Saldo é o dinheiro disponível na conta. Neste exemplo, procure o retângulo destacado com o texto Consultar saldo.', options: ['Consultar saldo', 'Pagar boleto', 'Comprovantes'], answer: 0, question: 'Qual opção do exemplo mostra o dinheiro disponível?' },
  { key: 'extrato', title: 'Consultar extrato', icon: 'list', description: 'Aprenda a reconhecer entradas e saídas.', focus: 'Consultar extrato', text: 'O extrato mostra o dinheiro que entrou e saiu.', simple: 'O extrato é uma lista do dinheiro que entrou e saiu. Confira a data e a descrição de cada item.', options: ['Apenas a senha', 'Entradas e saídas de um período', 'Um código de autenticação'], answer: 1, question: 'O que você encontra em um extrato?' },
  { key: 'pix', title: 'Conhecer o Pix', icon: 'swap-horizontal', description: 'Pratique a conferência antes de confirmar.', focus: 'Conferir destinatário', text: 'Antes de um Pix, confira o nome, o banco e o valor.', simple: 'Pare e confira: é a pessoa certa? O banco e o valor estão certos? Só prossiga no banco real se tiver certeza.', options: ['Só a cor da tela', 'Nome, instituição e valor', 'A urgência da mensagem'], answer: 1, question: 'O que conferir antes de confirmar um Pix?', },
  { key: 'boleto', title: 'Pagar boleto', icon: 'document-text', description: 'Reconheça os dados de uma cobrança.', focus: 'Conferir beneficiário', text: 'Confira quem vai receber, o valor e o vencimento.', simple: 'Veja para quem vai o dinheiro e quanto será pago. Se algo parecer diferente, pare e peça ajuda oficial.', options: ['Beneficiário, valor e vencimento', 'Somente o logotipo', 'Nada, basta confirmar'], answer: 0, question: 'Quais dados merecem atenção em um boleto?' },
  { key: 'comprovantes', title: 'Ver comprovantes', icon: 'receipt', description: 'Entenda para que serve um comprovante.', focus: 'Comprovante fictício', text: 'O comprovante é um registro da operação.', simple: 'O comprovante é um registro. Leia os dados e confira a situação da operação no seu próprio banco.', options: ['Uma senha de acesso', 'Um registro da operação', 'Uma promessa de prêmio'], answer: 1, question: 'Para que serve um comprovante?' },
  { key: 'seguranca', title: 'Reconhecer golpes', icon: 'shield-checkmark', description: 'Aprenda a pausar diante de mensagens suspeitas.', focus: 'Mensagem suspeita', text: '“Envie sua senha agora!” é uma mensagem suspeita. Não envie. Procure seu banco.', simple: 'Uma mensagem pediu sua senha e fez pressão? Pare. Não responda nem toque no link. Procure ajuda oficial.', options: ['Enviar a senha imediatamente', 'Parar e procurar o canal oficial', 'Repassar o código recebido'], answer: 1, question: 'O que fazer com a mensagem suspeita do exemplo?' },
  { key: 'ajuda', title: 'Pedir ajuda', icon: 'help-buoy', description: 'Saiba onde buscar orientação com segurança.', focus: 'Canal oficial', text: 'Busque o contato no seu cartão ou na agência.', simple: 'Precisa de ajuda? Confira o contato em uma fonte oficial que você já possui, como seu cartão ou sua agência.', options: ['Um contato enviado por desconhecido', 'Um perfil que promete dinheiro', 'Um canal confirmado do banco'], answer: 2, question: 'Onde buscar ajuda confiável?' },
];
export const lessons: Lesson[] = banks.flatMap(bank => topics.map(topic => ({
  id: `${bank.id}-${topic.key}`, bank: bank.id, title: topic.title, description: topic.description,
  icon: topic.icon, minutes: 3,
  steps: [
    step('Vamos começar', `Vamos praticar. As telas são exemplos, diferentes do aplicativo do banco.`, 'Você está em um lugar para aprender. Nenhum dinheiro será movimentado. Avance quando quiser.', 'Ambiente de aprendizagem', ['Ambiente de aprendizagem']),
    step(topic.title, topic.text, topic.simple, topic.focus, [topic.focus]),
    step('Tudo certo?', 'Veja o destaque. Depois, responda uma pergunta.', topic.simple, topic.focus, [topic.focus]),
  ], question: topic.question, options: topic.options, answer: topic.answer,
  feedback: topic.simple,
})));

