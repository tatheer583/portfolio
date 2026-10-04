const fs = require('fs');
const path = require('path');
const sass = require('sass');
const postcss = require('postcss');
const root = path.resolve(__dirname, '..');
const styles = path.join(root, 'components/sketch-studio/scene/styles');
const sheets = ['main.scss', 'NavigationUI.scss', 'GlobalOverlay.scss', 'ScreenReaderOverlay.scss', 'AudioControls.scss', 'AchievementsPanel.scss', 'AchievementPopup.scss'];
const css = sheets.map(file => sass.compile(path.join(styles, file), { style: 'expanded', silenceDeprecations: ['legacy-js-api', 'color-functions', 'global-builtin', 'import'] }).css).join('\n');
const tree = postcss.parse(css);
tree.walkRules(rule => {
  let parent = rule.parent;
  while (parent) { if (parent.type === 'atrule' && /keyframes/i.test(parent.name)) return; parent = parent.parent; }
  rule.selectors = rule.selectors.map(selector => {
    if (/^(html|body|:root)(?=[\s:.#\[]|$)/.test(selector)) return selector.replace(/^(html|body|:root)/, '.reference-portfolio');
    return '.reference-portfolio ' + selector;
  });
});
const extra = `
.reference-portfolio { position: relative; width: 100%; height: 100dvh; overflow: hidden; background: #fff6dc; color: #24221f; font-family: 'Cabin Sketch', 'Comic Sans MS', sans-serif; isolation: isolate; color-scheme: light; }
.reference-portfolio button, .reference-portfolio input, .reference-portfolio textarea { font: inherit; }
.reference-portfolio canvas { display: block; touch-action: none; }
.reference-portfolio .sketch-boot { display: grid; place-items: center; height: 100dvh; font-size: 1.5rem; }
.reference-portfolio .preloader { background-color: #fff6dc; }
.reference-portfolio .room-loading-hint { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 10; color: #39342b; font-family: 'Cabin Sketch', cursive; font-size: 1.25rem; animation: fadeIn .4s ease both; }
.reference-portfolio .navigation-ui__map-modal, .reference-portfolio .navigation-ui__help-modal { color: #24221f; }
.reference-portfolio .office-contact { position: absolute; z-index: 20; right: 5vw; top: 16vh; width: min(390px, 38vw); max-height: 76vh; overflow-y: auto; padding: 24px 26px 20px; color: #363127; background: #fff8e6; border: 2px solid #585044; border-radius: 4px 13px 6px 10px; box-shadow: 5px 6px 0 #c6b99055; transform: rotate(.5deg); animation: fadeIn .5s ease both; font-size: 15px; }
.reference-portfolio .office-contact--closed { padding: 10px 18px; width: auto; }
.reference-portfolio .office-contact__toggle { display: block; margin-left: auto; background: none; border: 0; font-size: 12px; cursor: pointer; color: #6c6252; padding: 0 0 10px; }
.reference-portfolio .office-contact--closed .office-contact__toggle { padding: 0; }
.reference-portfolio .office-contact__eyebrow { font-size: 11px; letter-spacing: .15em; margin: 0 0 9px; }
.reference-portfolio .office-contact h2 { font-size: 30px; line-height: 1.05; margin: 0 0 10px; }
.reference-portfolio .office-contact p { margin-bottom: 12px; }
.reference-portfolio .office-contact form { margin-top: 17px; }
.reference-portfolio .office-contact label { display: block; font-size: 13px; margin: 10px 0 4px; }
.reference-portfolio .office-contact label span { color: #6c6252; font-size: 11px; }
.reference-portfolio .office-contact input, .reference-portfolio .office-contact textarea { width: 100%; color: #332f26; background: #fffdf4; border: 1px solid #aaa08d; border-radius: 3px 6px 2px 5px; padding: 9px 11px; font-family: Arial, sans-serif; font-size: 13px; outline-offset: 3px; resize: vertical; }
.reference-portfolio .office-contact__actions { display: flex; gap: 8px; margin-top: 14px; }
.reference-portfolio .office-contact__actions button { cursor: pointer; border: 1px solid #555245; background: #dce8cd; border-radius: 5px 2px 8px 3px; padding: 10px 9px; font-size: 13px; flex: 1; }
.reference-portfolio .office-contact__actions button:last-child { background: #ececea; }
.reference-portfolio .office-contact__actions button:disabled { opacity: .55; cursor: wait; }
.reference-portfolio .office-contact__status { font-size: 12px; margin-top: 8px; }
.reference-portfolio .office-contact__status:empty { display: none; }
.reference-portfolio .office-contact__links { border-top: 1px dashed #aaa08d; margin-top: 16px; padding-top: 12px; font-size: 13px; }
.reference-portfolio .office-contact__links > a { display: block; margin-bottom: 7px; }
.reference-portfolio .office-contact__links div { display: flex; gap: 20px; }
.reference-portfolio .office-contact a:hover, .reference-portfolio .office-contact__toggle:hover { color: #446b49; text-decoration: underline; }
.reference-portfolio .corridor-look { position: absolute; z-index: 20; top: 80px; left: 22px; max-width: min(360px, calc(100vw - 44px)); padding: 12px 14px; background: #fff8e6eb; border: 1px solid #918672; border-radius: 4px 9px 3px 7px; color: #494034; box-shadow: 3px 4px 0 #b8aa8640; }
.reference-portfolio .corridor-look div { display: flex; gap: 6px; }
.reference-portfolio .corridor-look button { font-size: 12px; padding: 7px 9px; border: 1px solid #9c9586; background: #ececea; border-radius: 4px; cursor: pointer; }
.reference-portfolio .corridor-look button:hover { background: #e8dab6; }
.reference-portfolio .corridor-look p { font-size: 11px; line-height: 1.5; margin: 9px 0 0; }
.reference-portfolio .corridor-tour-switcher { display: flex; gap: 6px; margin-bottom: 9px; }
.reference-portfolio .corridor-tour-switcher button { font-size: 11px; letter-spacing: .03em; }
.reference-portfolio .corridor-tour-switcher button.is-active { background: #dce8cd; border-color: #60705a; box-shadow: inset 0 -2px 0 #78926f; }
.reference-portfolio .corridor-tour-status { display: grid; gap: 5px; font-size: 12px; min-width: 270px; }
.reference-portfolio .corridor-tour-status strong { font-size: 15px; font-weight: 600; }
.reference-portfolio .corridor-tour-status span { color: #6c6252; }
.reference-portfolio .corridor-tour-actions { display: flex; flex-wrap: wrap; gap: 5px; }
.reference-portfolio .corridor-tour-actions button { font-size: 11px; padding: 5px 7px; border: 1px solid #9c9586; background: #ececea; border-radius: 3px 6px 2px 5px; cursor: pointer; }
.reference-portfolio .corridor-tour-status label { color: #6c6252; font-size: 11px; }
.reference-portfolio .corridor-tour-status select { margin-left: 5px; border: 1px solid #9c9586; background: #fffdf4; padding: 2px 3px; }
.reference-portfolio .corridor-quote { position: absolute; z-index: 19; right: 22px; top: 80px; width: min(330px, calc(100vw - 44px)); padding: 13px 16px 14px; background: #fff8e6eb; border: 1px solid #918672; border-radius: 11px 4px 8px 3px; color: #494034; box-shadow: 3px 4px 0 #b8aa8640; transform: rotate(-.45deg); animation: fadeIn .45s ease both; }
.reference-portfolio .corridor-quote--closed { width: auto; }
.reference-portfolio .corridor-quote__toggle { display: block; margin-left: auto; border: 0; background: none; color: #6c6252; cursor: pointer; font-size: 11px; padding: 0; }
.reference-portfolio .corridor-quote__body { animation: fadeIn .5s ease both; }
.reference-portfolio .corridor-quote__eyebrow { margin: 10px 0 7px; font-size: 10px; letter-spacing: .11em; color: #6c6252; }
.reference-portfolio .corridor-quote blockquote { margin: 0; font-size: 20px; line-height: 1.08; color: #3e5d52; }
.reference-portfolio .corridor-quote__name { margin: 9px 0 1px; font-size: 15px; font-weight: 600; }
.reference-portfolio .corridor-quote__role { margin: 0; font-size: 11px; color: #6c6252; }
.reference-portfolio .corridor-quote__note { margin: 8px 0 10px; font-size: 12px; line-height: 1.3; }
.reference-portfolio .corridor-quote__pager { display: flex; gap: 5px; }
.reference-portfolio .corridor-quote__pager button { width: 8px; height: 8px; padding: 0; border: 1px solid #687d70; border-radius: 50%; background: #fffdf4; cursor: pointer; }
.reference-portfolio .corridor-quote__pager button.is-active { background: #5b8b76; }
@media (max-width: 700px) { .reference-portfolio .office-contact { right: 4vw; top: 24vh; width: 92vw; max-height: 69vh; padding: 18px 20px; background: #fff8e6f5; } .reference-portfolio .office-contact h2 { font-size: 25px; } }
@media (max-width: 700px) { .reference-portfolio .corridor-look { left: 12px; top: 70px; } .reference-portfolio .corridor-quote { right: 12px; top: auto; bottom: 88px; width: min(330px, calc(100vw - 24px)); } .reference-portfolio .corridor-quote blockquote { font-size: 18px; } }
@media (prefers-reduced-motion: reduce) { .reference-portfolio .office-contact { animation: none; transform: none; } }
`;
fs.writeFileSync(path.join(root, 'components/sketch-studio/reference.css'), tree.toString() + extra);
console.log('Compiled and scoped reference styles.');
