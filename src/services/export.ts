import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import { RecordResult } from '../types';
import { resultsCSV } from '../utils/results';
export async function exportResults(results: RecordResult[]) {
  const csv = resultsCSV(results);
  if (Platform.OS === 'web') {
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'banco-facil-resultados.csv'; anchor.click(); URL.revokeObjectURL(url); return;
  }
  if (!(await Sharing.isAvailableAsync())) throw new Error('Compartilhamento indisponível');
  const file = new File(Paths.cache, 'banco-facil-resultados.csv'); file.create({ overwrite: true }); file.write(csv);
  await Sharing.shareAsync(file.uri, { mimeType: 'text/csv', dialogTitle: 'Exportar resultados da pesquisa' });
}
