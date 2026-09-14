'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const output = path.resolve('dist/caramelo-preview');
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output,{recursive:true});
for(const entry of ['index.html','assets','docs','README.md','LICENSE','CHANGELOG.md']) {
  if(!fs.existsSync(entry))throw Error(`Missing package input: ${entry}`);
  fs.cpSync(entry,path.join(output,entry),{recursive:true});
}
const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else files.push({path:path.relative(output,p).split(path.sep).join('/'),sha256:crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')});}}
walk(output);files.sort((a,b)=>a.path.localeCompare(b.path));
const manifest={sourceSHA:process.env.GITHUB_SHA||'local-unversioned',generatedAt:new Date().toISOString(),purpose:'Internal demonstration; not a public research or clinical deployment',files};
fs.writeFileSync(path.join(output,'BUILD.json'),JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(path.join(output,'COMO-TESTAR.txt'),'CARAMELO - PREVIA INTERNA\n\nExtraia esta pasta, abra um terminal nela e execute:\npython -m http.server 8000\n\nAbra http://localhost:8000 no navegador. Nao abra via file://.\nA versao e os hashes estao em BUILD.json. Use somente dados ficticios.\nO progresso e local ao navegador; nao ha conta nem sincronizacao entre dispositivos.\nNao e instrumento psicologico validado. Artes finais, testes em aparelhos fisicos, revisao de acessibilidade, paginacao PDF e revisao com participantes continuam pendentes.\n\nOs testes automatizados ficam no repositorio, nao neste pacote de execucao.\n');
console.log(`Preview package: ${output}; ${files.length} input files; source ${manifest.sourceSHA}`);
