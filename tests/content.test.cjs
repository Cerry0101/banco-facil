const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(file) {
  const source = fs.readFileSync(file, 'utf8');
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const module = { exports: {} };
  new Function('module', 'exports', 'require', output)(module, module.exports, require);
  return module.exports;
}
const { lessons, banks } = load('src/data/tutorials.ts');
test('cada banco possui oito guias completos com respostas válidas', () => {
  assert.equal(new Set(lessons.map(l => l.id)).size, 16);
  for (const bank of banks) assert.equal(lessons.filter(l => l.bank === bank.id).length, 8);
  for (const lesson of lessons) {
    assert.ok(lesson.options[lesson.answer]);
    assert.ok(lesson.feedback);
    assert.equal(lesson.steps.length, 3);
    for (const step of lesson.steps) { assert.ok(step.simple); assert.ok(step.items.includes(step.focus)); }
  }
});
test('CSV preserva acentos, aspas, vírgulas e conclusão', () => {
  const { resultsCSV } = load('src/utils/results.ts');
  const csv = resultsCSV([{ session: 'sessao', lesson: 'caixa-"saldo,teste"', attempts: 2, errors: 1, help: 3, seconds: 42, completed: false }]);
  assert.ok(csv.startsWith('\uFEFFsessao,tutorial'));
  assert.ok(csv.includes('"caixa-""saldo,teste"""'));
  assert.ok(csv.endsWith('"2","1","3","42","false"'));
  assert.equal(csv.split('\r\n').length, 2);
});
