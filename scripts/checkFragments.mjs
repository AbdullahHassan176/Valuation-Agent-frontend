#!/usr/bin/env node

import { readFile, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Fragment mapping
const fragments = [
  { name: 'Dashboard', file: 'dashboard.html' },
  { name: 'Runs List', file: 'runs-list.html' },
  { name: 'Run Detail', file: 'run-detail.html' },
  { name: 'Intake', file: 'intake.html' },
  { name: 'Curves', file: 'curves.html' },
  { name: 'Instruments', file: 'instruments.html' },
  { name: 'XVA', file: 'xva.html' },
  { name: 'Governance', file: 'governance.html' },
  { name: 'Audit Log', file: 'audit-log.html' },
  { name: 'Settings', file: 'settings.html' }
];

const fragmentsDir = join(__dirname, '..', 'public', 'fragments');

console.log('🔍 Checking HTML Fragment Files...\n');

let totalSize = 0;
let emptyFragments = 0;
let missingFragments = 0;

for (const fragment of fragments) {
  const filePath = join(fragmentsDir, fragment.file);
  
  try {
    const stats = await stat(filePath);
    const size = stats.size;
    totalSize += size;
    
    // Check if file is empty or very small
    if (size < 5) {
      emptyFragments++;
      console.log(`⚠️  ${fragment.name.padEnd(12)} | ${fragment.file.padEnd(20)} | ${size.toString().padStart(4)} bytes | EMPTY`);
    } else {
      console.log(`✅ ${fragment.name.padEnd(12)} | ${fragment.file.padEnd(20)} | ${size.toString().padStart(4)} bytes`);
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      missingFragments++;
      console.log(`❌ ${fragment.name.padEnd(12)} | ${fragment.file.padEnd(20)} | MISSING`);
    } else {
      console.log(`💥 ${fragment.name.padEnd(12)} | ${fragment.file.padEnd(20)} | ERROR: ${error.message}`);
    }
  }
}

console.log('\n📊 Summary:');
console.log(`   Total fragments: ${fragments.length}`);
console.log(`   Missing: ${missingFragments}`);
console.log(`   Empty (< 5 bytes): ${emptyFragments}`);
console.log(`   Total size: ${totalSize} bytes`);

if (missingFragments > 0) {
  console.log('\n❌ Missing fragments detected!');
  console.log('   Run the development server to create empty fragment files.');
}

if (emptyFragments > 0) {
  console.log('\n⚠️  Empty fragments detected!');
  console.log('   Paste your HTML content into these files to see them rendered.');
}

if (missingFragments === 0 && emptyFragments === 0) {
  console.log('\n✅ All fragments are present and have content!');
}

console.log('\n💡 Tip: Use the "Copy path" button on each page to get the exact file path.');
