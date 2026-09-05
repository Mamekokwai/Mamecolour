'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const packagePath = path.join(root, 'package.json');
const lockPath = path.join(root, 'package-lock.json');
const requested = process.argv[2];

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version || '');
  if (!match) throw new Error('当前版本必须使用 x.y.z 格式: ' + version);
  return match.slice(1).map(Number);
}

function nextVersion(current, releaseType) {
  const parts = parseVersion(current);
  if (/^\d+\.\d+\.\d+$/.test(releaseType || '')) return releaseType;
  if (!['patch', 'minor', 'major'].includes(releaseType)) {
    throw new Error('用法: npm run release:patch | release:minor | release:major');
  }
  if (releaseType === 'major') return `${parts[0] + 1}.0.0`;
  if (releaseType === 'minor') return `${parts[0]}.${parts[1] + 1}.0`;
  return `${parts[0]}.${parts[1]}.${parts[2] + 1}`;
}

if (!requested) {
  console.error('用法: node scripts/release.js <patch|minor|major|x.y.z>');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const previousVersion = manifest.version;
const version = nextVersion(previousVersion, requested);
manifest.version = version;
fs.writeFileSync(packagePath, JSON.stringify(manifest, null, 2) + '\n');

if (fs.existsSync(lockPath)) {
  const lockfile = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
  lockfile.version = version;
  if (lockfile.packages && lockfile.packages['']) lockfile.packages[''].version = version;
  fs.writeFileSync(lockPath, JSON.stringify(lockfile, null, 2) + '\n');
}

console.log(`版本已从 ${previousVersion} 更新为 ${version}`);
console.log('请在 CHANGELOG.md 添加本次变更，然后运行 npm run release:verify。');
