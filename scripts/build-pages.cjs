const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
execFileSync(process.execPath, ['node_modules/expo/bin/cli', 'export', '--platform', 'web'], { stdio: 'inherit', env: { ...process.env, GITHUB_PAGES: '1' } });
fs.mkdirSync('docs', {recursive:true});
fs.cpSync('dist', 'docs', {recursive:true});
const html=fs.readFileSync('dist/index.html','utf8');
fs.writeFileSync('docs/404.html',html);
for (const route of ['demo','banks','learn','settings','progress','research']) { fs.mkdirSync(`docs/${route}`,{recursive:true}); fs.writeFileSync(`docs/${route}/index.html`,html); }
fs.writeFileSync('docs/.nojekyll','');
