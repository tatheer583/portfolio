const { chromium } = require('C:/Users/1/AppData/Local/Temp/tatheer-portfolio-check/node_modules/playwright');
const assert = require('assert/strict');
const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, 'sketch-preview');
fs.mkdirSync(outputDir, { recursive: true });

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-first-run'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const errors = [];
  const failed = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.status() >= 400) failed.push(`${response.status()} ${response.url()}`);
  });
  try {
    await page.goto('http://127.0.0.1:3000/?inspectScene', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.sr-overlay', { timeout: 120000 });
    await page.waitForTimeout(1500);
    const garden = await page.evaluate(() => {
      const state = document.querySelector('canvas').__portfolioScene;
      const group = state?.scene.getObjectByName('code-fish-garden');
      return {
        mounted: Boolean(group),
        ponds: group?.children.length || 0,
        fishLabels: group ? group.children.flatMap(pond => pond.children.filter(child => child.type === 'Mesh' || child.type === 'Group').map(child => child.name)).filter(Boolean) : [],
      };
    });
    assert.equal(garden.mounted, true, 'Code fish garden should be mounted outside the studio');
    assert.equal(garden.ponds, 2, 'Two code ponds should be mounted');
    await page.screenshot({ path: path.join(outputDir, 'entrance-ponds.png') });
    console.log('CODE PONDS PASSED:', garden.ponds);

    await page.mouse.click(785, 540);
    await page.waitForFunction(() => document.querySelector('.sr-overlay')?.textContent.includes('You are in the corridor'), { timeout: 30000 });
    await page.waitForTimeout(1200);
    const posterCount = await page.evaluate(() => {
      const state = document.querySelector('canvas').__portfolioScene;
      const wall = state?.scene.getObjectByName('developer-spotlight-wall');
      return wall?.children.filter(child => child.name.startsWith('developer-poster-')).length || 0;
    });
    assert.equal(posterCount, 5, 'Five developer spotlight posters should hang in the corridor');
    await page.screenshot({ path: path.join(outputDir, 'developer-posters.png') });
    console.log('DEVELOPER POSTERS PASSED:', posterCount);
    await page.getByRole('button', { name: 'AUTO TOUR ↗', exact: true }).click();
    await page.getByText('Camera is moving smoothly', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    assert.equal(await page.getByRole('button', { name: 'Explore manually', exact: true }).isVisible(), true);
    assert.equal(await page.getByRole('button', { name: 'Pause', exact: true }).isVisible(), true);
    const quote = await page.locator('.corridor-quote').innerText();
    assert.match(quote, /DEVELOPER SPOTLIGHT/);
    assert.match(quote, /Linus Torvalds|Grace Hopper|Margaret Hamilton|Alan Kay|Kent Beck/);
    await page.screenshot({ path: path.join(outputDir, 'auto-tour-start.png') });
    console.log('AUTO TOUR START PASSED:', quote.split('\n').slice(0, 3).join(' · '));

    const tourActions = page.locator('.corridor-tour-actions');
    await tourActions.getByRole('button', { name: 'Pause', exact: true }).click();
    await page.getByText('Paused', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    await tourActions.getByRole('button', { name: 'Resume', exact: true }).click();
    await page.getByText('Camera is moving smoothly', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    await tourActions.getByRole('button', { name: 'Explore manually', exact: true }).click();
    await page.getByRole('button', { name: 'Face forward in the corridor', exact: true }).waitFor({ state: 'visible', timeout: 10000 });
    console.log('AUTO TOUR PAUSE/RESUME/MANUAL SWITCH PASSED');

    const certificateColors = await page.evaluate(() => {
      const state = document.querySelector('canvas').__portfolioScene;
      const colors = [];
      state.scene.traverse(object => {
        if (object.name.startsWith('certificate-frame-') && object.material?.color) colors.push(object.material.color.getHexString());
      });
      return colors;
    });
    assert.ok(certificateColors.length >= 3, 'Certificate frame accents should be present');
    assert.ok(new Set(certificateColors).size >= 3, 'Certificate frames should use distinct accent colors');
    console.log('CERTIFICATE ACCENTS PASSED:', certificateColors.join(', '));
    assert.equal(errors.length, 0, `Unexpected browser errors: ${errors.join(' | ')}`);
    assert.equal(failed.length, 0, `Unexpected failed requests: ${failed.join(' | ')}`);
    console.log('NEW FEATURES PASSED');
  } finally {
    fs.writeFileSync(path.join(outputDir, 'new-features-report.json'), JSON.stringify({ errors, failed }, null, 2));
    await browser.close();
  }
}

main().catch(error => {
  console.error('NEW FEATURES CHECK FAILED:', error.stack || error.message);
  process.exitCode = 1;
});
