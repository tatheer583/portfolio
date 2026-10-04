const { chromium } = require('C:/Users/1/AppData/Local/Temp/tatheer-portfolio-check/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const dir = path.resolve(__dirname, '../artifacts/sketch-preview');
const assert = require('assert/strict');
fs.mkdirSync(dir, { recursive: true });
async function main() {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-first-run'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const errors = [], failed = [];
  page.on('pageerror', e => { errors.push(e.message); console.log('PAGE ERROR:', e.message); });
  page.on('response', r => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`); });
  page.on('console', m => { if (m.type() === 'error' || (m.type() === 'warning' && /context|timeout|shader/i.test(m.text()))) console.log('CONSOLE:', m.text().slice(0, 250)); });
  try {
    await page.goto(process.env.SKETCH_URL || 'http://127.0.0.1:3000/?inspectScene', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('.sr-overlay', { timeout: 120000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(dir, '01-entrance.png'), timeout: 60000 });
    console.log('PAGE:', (await page.locator('body').innerText()).slice(0, 1400));
    console.log('BUTTONS:', await page.locator('button').evaluateAll(nodes => nodes.map(n => ({ text: n.textContent.trim().slice(0, 60), label: n.getAttribute('aria-label'), title: n.title }))));
    if (errors.length) return;
    if (process.env.SKETCH_DETAILS === '1') {
      for (const [kind, uv] of [['cat', [.5, .45]], ['tree', [.45, .67]]]) {
        const point = await page.evaluate(({ kind, uv }) => {
          const state = document.querySelector('canvas').__portfolioScene;
          const mesh = state.scene.getObjectByName(`hover-color-${kind}`);
          const p = mesh.position.clone().set((uv[0] - .5) * mesh.geometry.parameters.width, (uv[1] - .5) * mesh.geometry.parameters.height, 0);
          mesh.localToWorld(p); p.project(state.camera);
          return { x: (p.x + 1) * innerWidth / 2, y: (1 - p.y) * innerHeight / 2 };
        }, { kind, uv });
        await page.mouse.move(point.x, point.y);
        await page.waitForFunction(kind => document.querySelector('canvas').__portfolioScene.scene.getObjectByName(`hover-color-${kind}`).material.uniforms.reveal.value > .8, kind, { timeout: 15000 });
        await page.screenshot({ path: path.join(dir, `entrance-${kind}-color.png`) });
        console.log('HOVER PASSED:', kind);
      }
      await page.mouse.move(720, 500);
      await page.keyboard.press('Enter');
    } else await page.mouse.click(785, 540);
    await page.waitForFunction(() => document.querySelector('.sr-overlay')?.textContent.includes('You are in the corridor'), { timeout: 30000 });
    await page.waitForTimeout(1800);
    await page.screenshot({ path: path.join(dir, '02-corridor.png'), timeout: 60000 });
    console.log('AFTER ENTER:', (await page.locator('body').innerText()).slice(0, 950));
    if (process.env.SKETCH_DETAILS === '1') {
      await page.evaluate(() => { window.__previewOpened = []; window.open = url => { window.__previewOpened.push(String(url)); return null; }; });
      const certificates = await page.evaluate(() => {
        const state = document.querySelector('canvas').__portfolioScene;
        const frames = [];
        state.scene.traverse(mesh => {
          if (!mesh.name.startsWith('certificate-frame-')) return;
          const point = mesh.position.clone(); mesh.getWorldPosition(point); point.project(state.camera);
          frames.push({ name: mesh.name, x: (point.x + 1) * innerWidth / 2, y: (1 - point.y) * innerHeight / 2 });
        });
        return frames;
      });
      assert.equal(certificates.length, 3, 'Three real certificates should be mounted');
      console.log('CERTIFICATE FRAMES:', certificates);
      await page.mouse.click(certificates[0].x, certificates[0].y);
      await page.waitForFunction(() => window.__previewOpened.some(url => url.includes('14c9URZJFtK5KK2dYQg9MN8YDG913rBAg')), { timeout: 15000 });
      console.log('CERTIFICATE CLICK PASSED');
      for (const [direction, sign] of [['left', -1], ['right', 1]]) {
        await page.getByRole('button', { name: 'Face forward in the corridor', exact: true }).click();
        await page.getByRole('button', { name: `Look ${direction} in the corridor`, exact: true }).click();
        await page.waitForFunction(sign => {
          const camera = document.querySelector('canvas').__portfolioScene.camera;
          return camera.getWorldDirection(camera.position.clone()).x * sign > .9;
        }, sign, { timeout: 15000 });
        await page.screenshot({ path: path.join(dir, `corridor-look-${direction}.png`) });
        console.log('FULL TURN PASSED:', direction);
      }
      await page.getByRole('button', { name: 'Face forward in the corridor', exact: true }).click();
      await page.keyboard.press('ArrowLeft');
      await page.waitForFunction(() => {
        const camera = document.querySelector('canvas').__portfolioScene.camera;
        return camera.getWorldDirection(camera.position.clone()).x < -.25;
      }, null, { timeout: 15000 });
      await page.getByRole('button', { name: 'Face forward in the corridor', exact: true }).click();
      await page.mouse.move(720, 450);
      await page.mouse.down();
      await page.mouse.move(900, 450, { steps: 12 });
      await page.mouse.up();
      await page.waitForFunction(() => {
        const camera = document.querySelector('canvas').__portfolioScene.camera;
        return camera.getWorldDirection(camera.position.clone()).x < -.75;
      }, null, { timeout: 15000 });
      console.log('KEYBOARD AND DRAG TURN PASSED');
      await page.getByRole('button', { name: 'Face forward in the corridor', exact: true }).click();
      await page.mouse.move(5, 450);
      await page.waitForFunction(() => {
        const camera = document.querySelector('canvas').__portfolioScene.camera;
        return camera.getWorldDirection(camera.position.clone()).x < -.85 && Math.abs(camera.position.x) < .05;
      }, null, { timeout: 15000 });
      await page.mouse.move(1435, 450);
      await page.waitForFunction(() => document.querySelector('canvas').__portfolioScene.camera.getWorldDirection(document.querySelector('canvas').__portfolioScene.camera.position.clone()).x > .85, null, { timeout: 15000 });
      console.log('CURSOR ROTATION PASSED');
      await page.getByRole('button', { name: 'Face forward in the corridor', exact: true }).click();
      await page.mouse.move(400, 450);
      await page.mouse.wheel(0, 330);
      await page.waitForTimeout(3000);
      await page.getByRole('button', { name: 'Face forward in the corridor', exact: true }).click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(dir, 'corridor-certificates.png') });
    }
    if (process.env.SKETCH_ROOMS === '1') {
      for (const [room, title] of [['gallery', 'Gallery'], ['studio', 'Studio'], ['about', 'About'], ['contact', 'Contact']]) {
        if (process.env.SKETCH_ONLY && !process.env.SKETCH_ONLY.split(',').includes(room)) continue;
        await page.getByRole('button', { name: 'Toggle menu', exact: true }).click();
        await page.waitForTimeout(1000);
        if (room === 'gallery') await page.screenshot({ path: path.join(dir, '03-map.png') });
        await page.locator(`button[title="${title}"]`).click();
        await page.waitForFunction(expected => document.querySelector('.sr-overlay')?.textContent.includes(`You are in the ${expected} room`), title, { timeout: 90000 });
        await page.waitForTimeout(15000);
        const inspection = await page.evaluate(() => {
          const s = document.querySelector('canvas').__portfolioScene;
          if (!s) return null;
          s.scene.updateMatrixWorld(true);
          const records = [];
          s.scene.traverse(o => {
            const map = o.material?.map;
            const url = map?.image?.src || '';
            if (!o.isMesh) return;
            const point = o.position.clone(); o.getWorldPosition(point);
            const view = point.clone().applyMatrix4(s.camera.matrixWorldInverse);
            let visible = o.visible, p = o.parent; while (p) { visible = visible && p.visible; p = p.parent; }
            records.push({ geometry: o.geometry.type, imageType: map?.image?.constructor?.name, map: Boolean(map), url: url.split('/').slice(-2).join('/'), visible, view: view.toArray().map(v => +v.toFixed(1)) });
          });
          return { camera: s.camera.position.toArray(), rotation: s.camera.rotation.toArray(), meshCount: records.length, meshes: records.slice(-45), contextLost: s.gl.getContext().isContextLost(), render: s.gl.info.render, paper: [...document.querySelectorAll('.preloader')].map(e => ({ display: getComputedStyle(e).display, opacity: getComputedStyle(e).opacity })) };
        });
        fs.writeFileSync(path.join(dir, `inspection-${room}.json`), JSON.stringify(inspection, null, 2));
        console.log('SCENE:', room, inspection?.camera, 'meshes:', inspection?.meshCount, 'draws:', inspection?.render?.calls, 'contextLost:', inspection?.contextLost);
        await page.screenshot({ path: path.join(dir, `room-${room}.png`), timeout: 60000 });
        console.log('ROOM:', room, (await page.locator('body').innerText()).slice(0, 250));
        if (room === 'contact' && process.env.SKETCH_DETAILS === '1') {
          await page.getByLabel('Your name', { exact: true }).fill('Preview visitor');
          await page.getByLabel('Your email', { exact: false }).fill('preview@example.com');
          await page.getByLabel('Your message', { exact: true }).fill('I would like to discuss a new project with you.');
          await page.getByRole('button', { name: 'Send on WhatsApp' }).click();
          const destination = await page.evaluate(() => window.__previewOpened.at(-1));
          const whatsApp = new URL(destination);
          assert.equal(whatsApp.hostname, 'wa.me');
          assert.equal(whatsApp.pathname, '/923448901377');
          assert.match(whatsApp.searchParams.get('text'), /Preview visitor.*\nEmail: preview@example.com/);
          assert.match(whatsApp.searchParams.get('text'), /new project with you/);
          assert.equal(await page.locator('.office-contact a[href^="mailto:"]').getAttribute('href'), 'mailto:mtatheer11@gmail.com');
          assert.equal(await page.locator('.office-contact a').filter({ hasText: 'GitHub' }).getAttribute('href'), 'https://github.com/tatheer583');
          console.log('CONTACT HANDOFF PASSED');
          await page.setViewportSize({ width: 390, height: 844 });
          await page.waitForTimeout(1000);
          const panel = await page.locator('.office-contact').boundingBox();
          assert.ok(panel.x >= 0 && panel.x + panel.width <= 391 && panel.y + panel.height <= 845, 'Mobile contact panel should fit the screen');
          await page.screenshot({ path: path.join(dir, 'contact-mobile.png') });
          console.log('MOBILE CONTACT PASSED');
        }
      }
    }
    if (process.env.SKETCH_DETAILS === '1') {
      const config = await page.request.get('http://127.0.0.1:3000/api/contact');
      assert.equal(config.status(), 200);
      console.log('EMAIL CONFIG:', await config.json());
      const invalid = await page.request.post('http://127.0.0.1:3000/api/contact', { data: { name: 'x' } });
      assert.equal(invalid.status(), 400);
      const irssa = await page.request.get('http://127.0.0.1:3000/projects/irssa-psl');
      assert.equal(irssa.status(), 200);
      assert.match(await irssa.text(), /psl-sign-learn/);
      const resume = await page.request.get('http://127.0.0.1:3000/resume');
      assert.equal(resume.status(), 200);
      assert.match(resume.headers()['content-type'], /application\/pdf/);
      console.log('CASE STUDY, RESUME DOWNLOAD, API VALIDATION PASSED');
    }
  } catch (error) {
    console.log('CHECK FAILED:', error.message.slice(0, 600));
    console.log('FAILED VIEW:', (await page.locator('body').innerText().catch(() => '')).slice(0, 600));
    await page.screenshot({ path: path.join(dir, 'failed-check.png'), timeout: 30000 }).catch(() => {});
    throw error;
  } finally {
    fs.writeFileSync(path.join(dir, 'browser-report.json'), JSON.stringify({ errors, failed }, null, 2));
    await browser.close();
  }
}
main().catch(e => { console.error(e); process.exitCode = 1; });
