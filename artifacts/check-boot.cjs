const { chromium } = require('C:/Users/1/AppData/Local/Temp/tatheer-portfolio-check/node_modules/playwright');
async function main() {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', e => console.log('ERROR', e.message));
  page.on('requestfailed', r => console.log('FAILED', r.url(), r.failure()));
  try {
    await page.goto('http://127.0.0.1:3000/?inspectScene', { waitUntil: 'domcontentloaded' });
    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(10000);
      console.log('BOOT', i, await page.evaluate(() => {
        const state = document.querySelector('canvas')?.__portfolioScene;
        return { text: document.body.innerText.slice(0, 350), loaded: !!document.querySelector('.sr-overlay'), render: state?.gl.info.render, lost: state?.gl.getContext().isContextLost() };
      }));
      await page.screenshot({ path: 'artifacts/sketch-preview/boot-current.png', timeout: 30000 });
      if (await page.locator('.sr-overlay').count()) break;
    }
  } finally { await browser.close(); }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
