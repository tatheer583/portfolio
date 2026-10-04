const path = require('path');
const sharp = require('sharp');

// New vector drawings for Tatheer's doors; the reference frame and hinges stay intact.
const marks = {
  mountain: '<path d="M-93 54L-30-63 11-3 40-43 99 54ZM-52-22L-30-63-8-29M-29 88Q5 66 35 86T93 85"/>',
  medical: '<path d="M-28-80H28V-28H80V28H28V80H-28V28H-80V-28H-28Z"/><path d="M-109 11H-71L-49-22-14 50 19-12 42 11H109"/>',
  drone: '<rect x="-31" y="-27" width="62" height="54" rx="10"/><path d="M-28-24L-70-58M28-24L70-58M-28 24L-70 58M28 24L70 58"/><ellipse cx="-77" cy="-68" rx="39" ry="18"/><ellipse cx="77" cy="-68" rx="39" ry="18"/><ellipse cx="-77" cy="68" rx="39" ry="18"/><ellipse cx="77" cy="68" rx="39" ry="18"/>',
  khidmat: '<path d="M-90 32L-56-9-20 15 6-11 67 15 89-14M-65 13L-23 56Q-9 72 6 57L48 18M-19 14L5 29Q18 40 30 25M-98 12L-73-30-45-13M75-6L102 11 78 53 58 36"/><path d="M-16-61L0-87 16-61M0-50V-80"/>',
  hand: '<path d="M-43 81Q-75 62-75 17V-35Q-74-54-59-53-44-52-44-34V-71Q-44-91-26-89-12-88-12-70V-82Q-11-103 7-98 21-96 21-77V-65Q22-81 39-77 53-74 51-55V-12L77-26Q101-35 107-12L81 22 58 60 40 81Z"/><path d="M-44-34V4M-12-70V-7M21-65V-9M-18 26Q17 1 51 21"/>',
  wave: '<path d="M-106-45Q0-135 106-45M-78-7Q0-73 78-7M-44 29Q0-12 44 29"/><circle cy="65" r="12"/>',
  github: '<path d="M-65-48L-74-91-26-67Q0-77 26-67L74-91 65-48Q96 12 51 40L43 89H-43L-51 40Q-96 12-65-48Z"/><path d="M-46 59Q-105 80-108 21"/>',
  linkedin: '<rect x="-93" y="-93" width="186" height="186" rx="20"/><text x="-69" y="61" fill="currentColor" stroke="none" font-family="Arial,sans-serif" font-weight="bold" font-size="170">in</text>',
  vercel: '<path d="M0-94L105 87H-105Z" fill="currentColor"/>',
  chatgpt: Array.from({ length: 6 }, (_, i) => `<path transform="rotate(${i * 60})" d="M0-26L44-51Q86-80 103-32 119 4 79 26L37 51 0 26Z"/>`).join(''),
  claude: Array.from({ length: 12 }, (_, i) => `<path transform="rotate(${i * 30})" d="M0-26L-9-101 9-101 0-26Z"/>`).join(''),
  gemini: '<path d="M0-106Q14-14 106 0 14 14 0 106-14 14-106 0-14-14 0-106Z"/>',
};
const projects = [['SKARDU SPRING', 'mountain'], ['MEDICONNECT', 'medical'], ['DRONE VISION', 'drone'], ['KHIDMAT APP', 'khidmat'], ['IRSSA PSL', 'hand'], ['WIWAVE MOTION', 'wave']];
const tools = [['GITHUB', 'github'], ['LINKEDIN', 'linkedin'], ['VERCEL', 'vercel'], ['CHATGPT', 'chatgpt'], ['CLAUDE', 'claude'], ['GEMINI', 'gemini']];
function door(items, painted) {
  const colors = ['#4f8878', '#477797', '#8e769b', '#9e7545', '#ae7762', '#5c83a1'];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="2048" viewBox="0 0 1024 2048">
    <path d="M29 17L997 25 987 2030 32 2020Z" fill="#ececea" stroke="#383731" stroke-width="9"/>
    <path d="M51 42L973 51 965 2005 57 1994Z" fill="none" stroke="#646158" stroke-width="3"/>
    <path d="M94 105L923 112 916 1244 103 1238ZM102 1321L914 1328 908 1906 110 1896Z" fill="${painted ? '#fff2cf' : '#f5f3ec'}" stroke="#49463f" stroke-width="7"/>
    <path d="M113 126L902 130 897 1223 122 1215M123 1343L893 1347 885 1886 130 1873" fill="none" stroke="#716b60" stroke-width="2"/>
    ${items.map(([label, mark], index) => {
      const x = index % 2 ? 706 : 319;
      const y = index < 4 ? 363 + Math.floor(index / 2) * 542 : 1585;
      return `<g transform="translate(${x} ${y})" color="${painted ? colors[index] : '#393731'}">
        ${painted ? '<path d="M-135-111Q-9-146 135-93L132 115Q6 140-139 97Z" fill="currentColor" opacity=".12"/>' : ''}
        <g fill="none" stroke="currentColor" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">${marks[mark]}</g>
        <text x="0" y="174" font-family="Comic Sans MS,cursive" font-size="${label.length > 11 ? 31 : 37}" text-anchor="middle" fill="#393731">${label}</text>
        <path d="M-124 195Q0 182 128 192" fill="none" stroke="#696257" stroke-width="2"/>
      </g>`;
    }).join('')}
    <path d="M80 1970L930 1973" fill="none" stroke="#686459" stroke-width="2"/>
  </svg>`;
}
module.exports = async function buildDoors(out) {
  for (const [name, items] of [['projects', projects], ['tools', tools]]) {
    for (const painted of [false, true]) {
      await sharp(Buffer.from(door(items, painted))).webp({ quality: 94 }).toFile(path.join(out, `door-${name}${painted ? '-painted' : ''}.webp`));
    }
  }
};
