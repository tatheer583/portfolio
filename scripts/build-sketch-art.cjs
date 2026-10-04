// Portfolio-specific procedural SVG artwork. No reference biography or project claims.
const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'public/reference/portfolio');
fs.mkdirSync(out, { recursive: true });
function data(file) {
  const js = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const exports = {}; new Function('exports', 'require', js)(exports, require); return exports;
}
const { PROJECTS } = data('data/projects.ts');
const { EDUCATION, EXPERIENCE } = data('data/experience.ts');
const { SKILLS } = data('data/skills.ts');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function lines(s, max) {
  const result = []; let line = '';
  for (const word of s.split(/\s+/)) { if ((line + ' ' + word).length > max && line) { result.push(line); line = word; } else line = (line + ' ' + word).trim(); }
  if (line) result.push(line); return result;
}
const text = (s, x, y, size, max = 30) => lines(s, max).map((line, i) => `<text x="${x}" y="${y + i * size * 1.2}" font-family="Comic Sans MS, cursive" font-size="${size}" fill="#292723">${esc(line)}</text>`).join('');
function card(title, subtitle, index, painted) {
  const c = ['#91aea0', '#cbb27a', '#aca0bf', '#88a2b8'][index % 4];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1150" viewBox="0 0 1600 1150">
  <path d="M45 55L1545 43 1558 1098 52 1112Z" fill="${painted ? '#fff0bf' : '#fffdf3'}" stroke="#282722" stroke-width="5"/>
  <path d="M65 69L1534 61 1540 1080 72 1097Z" fill="none" stroke="#555149" stroke-width="2"/>
  ${painted ? `<path d="M165 380Q470 290 772 394T1410 340L1435 780Q1130 858 800 782T143 830Z" fill="${c}" opacity=".22"/>` : ''}
  ${text(String(index + 1).padStart(2, '0') + ' / MUHAMMAD TATHEER', 105, 137, 32, 60)}
  ${text(title.toUpperCase(), 105, 240, 63, 32)}
  <g fill="none" stroke="#2b2923" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
  <path d="M368 436L1228 417 1249 846 350 860Z" fill="${painted ? '#f3e6bd' : '#fffdf3'}"/>
  <path d="M387 463L1204 445 1217 808 382 824Z"/>
  <path d="M655 853L654 938 948 933 937 851M575 947L1020 942"/>
  <path d="M554 589L485 654 560 710M1065 580L1139 641 1068 704M867 526L783 744"/>
  <path d="M408 486L424 485M445 485L461 484M481 484L497 483" stroke-width="10"/>
  <path d="M250 649Q188 575 199 488M229 548L199 482 162 531M1322 695Q1376 722 1440 681M1402 656L1447 678 1412 719" stroke-width="4"/>
  <path d="M286 813l18 18m-23 5l21-22M1300 495l20 20m-20 0l20-20" stroke-width="4"/>
  </g>
  ${text(subtitle, 105, 1025, 32, 78)}
  <path d="M1330 989L1452 994M1425 971L1454 995 1422 1020" fill="none" stroke="#292723" stroke-width="4"/>
  </svg>`;
}
async function write(svg, file) { fs.mkdirSync(path.dirname(file), { recursive: true }); await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(file); }
function galleryArchitecture(painted) {
  const ink = '#292723';
  const paper = painted ? '#fff0bf' : '#fffdf3';
  const soft = painted ? '#d5e7df' : '#f2eee1';
  const blue = painted ? '#4e7f98' : '#d8ddd9';
  const green = painted ? '#6b9a78' : '#e0e4dd';
  const amber = painted ? '#c98d43' : '#e7e0cc';
  const purple = painted ? '#8e789f' : '#e4dce4';
  const arrow = (x1, y1, x2, y2, color = ink) => `<path d="M${x1} ${y1}L${x2} ${y2}M${x2 - 12} ${y2 - 6}L${x2} ${y2} ${x2 - 12} ${y2 + 6}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
  const box = (x, y, w, h, label, fill) => `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${fill}" stroke="${ink}" stroke-width="5"/><text x="${x + w / 2}" y="${y + h / 2 + 10}" text-anchor="middle" font-family="Comic Sans MS,cursive" font-size="28" fill="${ink}">${esc(label)}</text></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="764" viewBox="0 0 1800 764">
    <path d="M28 34Q72 10 116 31L1673 24Q1767 32 1772 116L1760 663Q1739 724 1668 719L112 735Q34 722 31 654Z" fill="${paper}" opacity=".9" stroke="${ink}" stroke-width="6"/>
    <path d="M91 116Q408 63 774 108T1691 93" fill="none" stroke="${painted ? '#9bbba9' : '#bcb7a7'}" stroke-width="3"/>
    <text x="900" y="88" text-anchor="middle" font-family="Comic Sans MS,cursive" font-size="40" font-weight="bold" fill="${ink}">DATABASE + MCP ARCHITECTURE</text>
    <text x="100" y="158" font-family="Comic Sans MS,cursive" font-size="27" fill="${ink}">DATA LAYER</text>
    <text x="1010" y="158" font-family="Comic Sans MS,cursive" font-size="27" fill="${ink}">MODEL CONTEXT PROTOCOL FLOW</text>
    <g stroke="${ink}" stroke-width="5" fill="none">
      <ellipse cx="265" cy="265" rx="105" ry="28" fill="${blue}"/><path d="M160 265V406Q265 466 370 406V265" fill="${blue}"/><path d="M160 324Q265 383 370 324M160 385Q265 443 370 385"/>
      <ellipse cx="560" cy="265" rx="105" ry="28" fill="${green}"/><path d="M455 265V406Q560 466 665 406V265" fill="${green}"/><path d="M455 324Q560 383 665 324M455 385Q560 443 665 385"/>
      <ellipse cx="412" cy="553" rx="105" ry="28" fill="${amber}"/><path d="M307 553V647Q412 702 517 647V553" fill="${amber}"/><path d="M307 602Q412 657 517 602"/>
    </g>
    <text x="265" y="500" text-anchor="middle" font-family="Comic Sans MS,cursive" font-size="27" fill="${ink}">USERS</text>
    <text x="560" y="500" text-anchor="middle" font-family="Comic Sans MS,cursive" font-size="27" fill="${ink}">API CACHE</text>
    <text x="412" y="712" text-anchor="middle" font-family="Comic Sans MS,cursive" font-size="27" fill="${ink}">PRIMARY DATABASE</text>
    ${arrow(372, 286, 452, 286)}${arrow(560, 442, 454, 542)}${arrow(265, 442, 350, 542)}
    ${box(1040, 220, 170, 82, 'USER', soft)}
    ${box(1280, 220, 214, 82, 'MCP CLIENT', blue)}
    ${box(1540, 220, 192, 82, 'MCP SERVER', purple)}
    ${arrow(1215, 260, 1270, 260)}${arrow(1500, 260, 1530, 260)}
    ${box(1145, 420, 220, 84, 'TOOLS', amber)}
    ${box(1435, 420, 220, 84, 'RESOURCES', green)}
    ${arrow(1636, 315, 1538, 408)}${arrow(1610, 315, 1258, 408)}
    <path d="M1064 560Q1250 630 1430 556T1710 567" fill="none" stroke="${painted ? '#7397a4' : '#b5b4a6'}" stroke-width="5" stroke-dasharray="14 12"/>
    <text x="1388" y="615" text-anchor="middle" font-family="Comic Sans MS,cursive" font-size="26" fill="${ink}">context in · tools out · auditable</text>
    <g font-family="monospace" font-size="24" fill="${ink}"><text x="84" y="683">query()</text><text x="707" y="190">schema → service → storage</text><text x="1025" y="685">discover → call → return</text></g>
    <path d="M760 225l56-27 47 28-56 28zM760 225v62l47 29 56-28v-62M807 254v62" fill="${painted ? '#d9c788' : '#ebe5d5'}" stroke="${ink}" stroke-width="4"/>
    <text x="808" y="376" text-anchor="middle" font-family="Comic Sans MS,cursive" font-size="25" fill="${ink}">DATA CONTRACT</text>
  </svg>`;
}
async function main() {
  await require('./build-door-art.cjs')(out);
  for (const painted of [false, true]) await write(galleryArchitecture(painted), path.join(out, `gallery-architecture${painted ? '-painted' : ''}.webp`));
  for (let i = 0; i < PROJECTS.length; i++) {
    const p = PROJECTS[i];
    for (const painted of [false, true]) await write(card(p.title, p.tech.slice(0, 5).join(' · '), i, painted), path.join(out, `project-${p.id}${painted ? '-painted' : ''}.webp`));
  }
  for (const tech of new Set(PROJECTS.flatMap(p => p.tech.slice(0, 4)))) {
    await write(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="220"><rect x="8" y="8" width="584" height="204" rx="28" fill="#fff5d7" stroke="#3e3b34" stroke-width="5"/>${text(tech, 35, 125, tech.length > 15 ? 34 : 46, 35)}</svg>`, path.join(out, `tech-${tech.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.webp`));
  }
  await write(card(EDUCATION.institution, EDUCATION.degree + ' · ' + EDUCATION.period, 0, true), path.join(out, 'education.webp'));
  for (let i = 0; i < EXPERIENCE.length; i++) await write(card(EXPERIENCE[i].title, EXPERIENCE[i].period, i, true), path.join(out, `experience-${i}.webp`));
  for (let i = 0; i < SKILLS.length; i++) await write(card(SKILLS[i].label, SKILLS[i].skills.slice(0, 6).map(s => s.name).join(' · '), i, true), path.join(out, `skills-${i}.webp`));
  // Anonymous ink mascot with a laptop: nine frames for the existing avatar animation.
  function avatar(frame = 0, cloud = false) {
    const dx = Math.sin(frame / 8 * Math.PI) * 9;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${cloud ? 1408 : 720}" height="${cloud ? 768 : 1100}" viewBox="0 0 ${cloud ? '1408 768' : '720 1100'}">
    ${cloud ? '<path d="M130 630Q25 550 210 515 205 428 385 478 498 406 616 481 751 388 899 468 1030 417 1139 509 1382 492 1262 631Q931 756 130 630Z" fill="#fff5dc" stroke="#38352e" stroke-width="5"/>' : ''}
    <g transform="${cloud ? 'translate(488 10) scale(.6)' : `translate(${dx} 0)`}" stroke="#292723" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M288 660L264 962 316 979 365 725 399 977 456 966 428 655" fill="#f4ecd5"/>
    <path d="M262 949L230 999Q258 1025 321 1015L320 976M397 973L396 1014Q460 1035 493 1003L448 950" fill="#f9f7ed"/>
    <path d="M256 336Q353 292 446 340L485 650Q385 708 242 653Z" fill="#fff6d6"/>
    <path d="M272 368L219 537 302 574M430 360L500 499 440 563" fill="#f8f3e5"/>
    <path d="M303 518L428 503 459 625 292 644Z" fill="#e8e5dc"/><path d="M320 535L414 524 433 604 309 617Z" fill="#fff6dc"/>
    <path d="M349 561L336 575 351 586M388 555L400 568 387 583M376 548L363 591" fill="none" stroke-width="4"/>
    <path d="M301 295L306 326Q365 361 406 326L407 292" fill="#f3e5ca"/>
    <path d="M284 180Q289 94 363 95 451 92 445 207L427 267Q363 322 300 268Z" fill="#fff1d1"/>
    <path d="M286 206L281 131Q317 61 410 95 459 100 453 185L437 216 418 158Q385 181 320 151L302 218Z" fill="#403d37"/>
    <path d="M306 212Q330 201 347 213M378 211Q400 198 419 212M332 254Q363 276 396 250" fill="none" stroke-width="4"/>
    <path d="M352 239L367 239" fill="none" stroke-width="3"/>
    <path d="M308 196L350 192 353 231 306 231ZM376 192L418 193 420 230 377 230ZM352 207L376 207" fill="none" stroke-width="4"/>
    </g></svg>`;
  }
  for (let i = 0; i < 9; i++) await write(avatar(i), path.join(root, `public/reference/textures/corridor/avatar_anim/${i + 1}.webp`));
  for (const file of ['entrance/avatar_window.webp', 'corridor/avatar_sketch.webp']) await write(avatar(), path.join(root, 'public/reference/textures', file));
  await write(avatar(0, true), path.join(root, 'public/reference/textures/about/awatarnachmurce.webp'));
  for (const [name, label, sub, idx] of [['SOTD', 'MY PROJECTS', `${PROJECTS.length} ideas, made real`, 0], ['SOTM', 'MY JOURNEY', EDUCATION.institution, 1], ['SOTY', 'MY SKILLS', 'Full stack · AI · Security', 2]]) {
    for (const painted of [false, true]) await write(card(label, sub, idx, painted), path.join(root, `public/reference/textures/about/${name}${painted ? '_painted' : ''}.webp`));
  }
  for (const [name, title, subtitle] of [['uowyspa', EDUCATION.institution, EDUCATION.degree], ['freelancewyspa', 'FULL STACK DEVELOPER', 'Web products · AI · Security']]) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1408" height="768"><path d="M56 503Q54 424 150 430L240 241 339 311 510 175 665 331 828 227 928 336 1130 254 1264 423Q1420 442 1325 531L805 698 383 666Z" fill="#fff0c5" stroke="#34312b" stroke-width="5"/><path d="M57 503Q487 592 1325 531L805 698 383 666Z" fill="#e4d9bb" stroke="#34312b" stroke-width="4"/>${text(title, 220, 392, 62, 30)}${text(subtitle, 250, 465, 38, 38)}</svg>`;
    await write(svg, path.join(root, `public/reference/textures/about/${name}.webp`));
  }
  const resumeDir = path.join(root, 'public/reference/textures/resume');
  fs.mkdirSync(resumeDir, { recursive: true });
  await write(card('MUHAMMAD TATHEER', 'Full Stack Developer · Pakistan', 0, false), path.join(resumeDir, 'resume_page.webp'));
  // Legacy room loaders require these paths even when the resume is a normal page.
  for (const name of ['google', 'microsoft', 'openai', 'nvidia', 'amazon']) await write(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="220">${text('Full Stack · AI · Security', 10, 125, 33, 40)}</svg>`, path.join(resumeDir, `${name}.webp`));
  console.log(`Generated ${PROJECTS.length} project exhibits and personal artwork.`);
  for (const [slug, title] of [['next-js', 'Next.js'], ['typescript', 'TypeScript'], ['mongodb', 'MongoDB']]) {
    for (const painted of [false, true]) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1440"><ellipse cx="359" cy="460" rx="286" ry="375" fill="${painted ? '#dfce90' : '#fff9e9'}" stroke="#34312b" stroke-width="5"/><ellipse cx="362" cy="459" rx="274" ry="365" fill="none" stroke="#625d50" stroke-width="2"/><path d="M325 828L358 869 389 826M357 868Q280 970 365 1080T330 1400" fill="none" stroke="#37332d" stroke-width="5"/>${text(title, 135, 479, title.length > 8 ? 58 : 74, 15)}<path d="M209 205Q122 289 142 370" fill="none" stroke="#37332d" stroke-width="3"/></svg>`;
      await write(svg, path.join(out, `balloon-${slug}${painted ? '-painted' : ''}.webp`));
    }
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
