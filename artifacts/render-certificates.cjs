const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const tooling = 'C:/Users/1/AppData/Local/Temp/tatheer-portfolio-check/node_modules';
const { createCanvas, DOMMatrix, ImageData, Path2D } = require(path.join(tooling, '@napi-rs/canvas'));
global.DOMMatrix = DOMMatrix; global.ImageData = ImageData; global.Path2D = Path2D;
async function main() {
  const pdfjs = await import(pathToFileURL(path.join(tooling, 'pdfjs-dist/legacy/build/pdf.mjs')).href);
  const dir = path.resolve(__dirname, '../public/certificates');
  for (const id of ['14c9URZJFtK5KK2dYQg9MN8YDG913rBAg', '1sqcXrGURkdKlmJQhWijIxUK4XPov6s4A', '12RhVAh7ZR98i79LCs6QgM3NLfxykwH0e']) {
    const bytes = fs.readFileSync(path.join(dir, `${id}.original`));
    fs.writeFileSync(path.join(dir, `${id}.pdf`), bytes);
    const doc = await pdfjs.getDocument({ data: new Uint8Array(bytes), useSystemFonts: true, standardFontDataUrl: `${tooling}/pdfjs-dist/standard_fonts/` }).promise;
    const page = await doc.getPage(1);
    const text = await page.getTextContent();
    console.log(id, 'PAGES:', doc.numPages, text.items.map(item => item.str).join(' ').slice(0, 3500));
    const base = page.getViewport({ scale: 1 });
    const viewport = page.getViewport({ scale: 1600 / base.width });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    await page.render({ canvasContext: canvas.getContext('2d'), canvas, viewport }).promise;
    fs.writeFileSync(path.join(dir, `${id}.png`), canvas.toBuffer('image/png'));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
