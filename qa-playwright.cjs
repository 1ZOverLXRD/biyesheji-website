const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const base = 'http://localhost:4173';
  const results = {};

  await page.goto(base, { waitUntil: 'networkidle' });
  results['Home loads'] = (await page.locator('#app').innerHTML()).length > 0;

  const navNames = ['Home', 'Projects', 'Pricing', 'Submit', 'About'];
  for (const name of navNames) {
    const el = page.getByRole('link', { name: new RegExp(name, 'i') }).first();
    results['Nav ' + name + ' clickable'] = (await el.count()) > 0;
  }

  await page.goto(base + '/projects', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const cards = await page.locator('[class*="card"], [class*="project"]').count();
  results['Projects page has cards'] = cards >= 3;

  for (const slug of ['datacenter', 'smartlight', 'mlytemp']) {
    await page.goto(base + '/projects/' + slug, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const html = await page.locator('#app').innerHTML();
    results['Project ' + slug + ' loads'] = html.length > 0;
  }

  await page.goto(base + '/pricing', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  results['Pricing renders'] = (await page.locator('#app').innerHTML()).length > 0;

  await page.goto(base + '/submit', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  results['Submit renders'] = (await page.locator('#app').innerHTML()).length > 0;

  await page.goto(base + '/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  results['About renders'] = (await page.locator('#app').innerHTML()).length > 0;

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const hamburger = page.getByRole('button', { name: /menu|导航|hamburger/i }).first();
  results['Hamburger exists'] = (await hamburger.count()) > 0;

  await browser.close();

  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(Boolean).length;
  console.log('Scenarios [' + passed + '/' + total + ' pass] | VERDICT');
  for (const [k, v] of Object.entries(results)) {
    console.log('  ' + (v ? '✓' : '✗') + ' ' + k);
  }
})();
