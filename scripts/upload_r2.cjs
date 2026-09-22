const { execSync } = require('child_process');
const fs = require('fs');

const files = fs.readdirSync('storage/paid').filter((f) => f.endsWith('.docx'));
for (const name of files) {
  const key = 'paid/' + name;
  const full = 'storage/paid/' + name;
  console.log('Uploading:', key);
  const cmd =
    'node node_modules/wrangler/bin/wrangler.js r2 object put "' +
    key +
    '" --file "' +
    full +
    '"';
  const out = execSync(cmd, { encoding: 'utf-8', env: process.env, stdio: ['ignore', 'pipe', 'pipe'] });
  console.log(
    out
      .split('\n')
      .filter((l) => l.includes('Creating object') || l.includes('Upload complete'))
      .join(' | '),
  );
}