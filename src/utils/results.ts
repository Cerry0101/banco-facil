import { RecordResult } from '../types';
export function resultsCSV(results: RecordResult[]): string {
  const quote = (value: unknown) => `"${String(value).replace(/"/g, '""')}"`;
  return '\uFEFF' + ['sessao,tutorial,tentativas,erros,nao_entendi,tempo_segundos,concluido', ...results.map(r => [r.session, r.lesson, r.attempts, r.errors, r.help, r.seconds, r.completed].map(quote).join(','))].join('\r\n');
}
