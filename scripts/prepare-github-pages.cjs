const fs = require('fs');
const path = require('path');

const outDir = path.resolve(process.argv[2] || 'out');
const basePath = '/portfolio';

if (!fs.existsSync(outDir)) {
  throw new Error(`Static export directory not found: ${outDir}`);
}

const textExtensions = new Set(['.css', '.html', '.js', '.json', '.map', '.svg']);
const rootDirectories = ['reference', 'images', 'hand-tracking', 'certificates', 'resume', 'projects', 'api'];
const rootFiles = ['icon.svg', 'og-image.png.svg', 'robots.txt', 'sitemap.xml', 'sitemap-0.xml'];
const segmentPattern = new RegExp(
  `(?<![A-Za-z0-9_:/.-])/(${rootDirectories.join('|')})(?=[/\\s"'?#.,)\\]}]|$)`,
  'g'
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');
}

function filesIn(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(fullPath) : [fullPath];
  });
}

let changedFiles = 0;
let replacements = 0;
for (const filePath of filesIn(outDir)) {
  if (!textExtensions.has(path.extname(filePath).toLowerCase())) continue;
  const before = fs.readFileSync(filePath, 'utf8');
  let after = before.replace(segmentPattern, `${basePath}/$1`);

  for (const file of rootFiles) {
    const filePattern = new RegExp(
      `(?<![A-Za-z0-9_:/.-])/${escapeRegExp(file)}(?=[/\\s"'?#.,)\\]}]|$)`,
      'g'
    );
    after = after.replace(filePattern, `${basePath}/${file}`);
  }

  after = after.replace(/((?:href|src|action)=["'])\/(?!\/)(["'])/g, `$1${basePath}/$2`);
  if (after !== before) {
    replacements += [...after.matchAll(new RegExp(basePath.replace('/', '\\/'), 'g'))].length;
    fs.writeFileSync(filePath, after);
    changedFiles += 1;
  }
}

console.log(`GitHub Pages paths prepared in ${changedFiles} files (${replacements} replacements).`);
