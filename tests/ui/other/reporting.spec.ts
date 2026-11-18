import { test, expect } from '../../fixtures';
import * as allure from 'allure-js-commons';
import { writeFile } from 'node:fs/promises';
import { Logger } from '../../../utils/logger';

// Keep these artifacts for this reporting check even when it passes.
test.use({ video: 'on', trace: 'on' });

// Local-only smoke test: no external services or account creation.
test('Allure reporting smoke test', async ({ page }, testInfo) => {
  await allure.epic('Automation framework');
  await allure.feature('Allure reporting');
  await allure.story('Inspect metadata and debugging attachments');
  await allure.severity('normal');
  await allure.owner('QA');
  await allure.tags('smoke', 'reporting');
  await allure.description('Validates report metadata, hooks, steps, logs, and file attachments without external services.');

  await test.step('Render a local page', async () => {
    await page.setContent('<h1>Allure reporting smoke test</h1>');
    await expect(page.getByRole('heading')).toHaveText('Allure reporting smoke test');
  });
  new Logger('ReportingSmoke').info('Local reporting smoke test completed');
  await testInfo.attach('Page screenshot', { body: await page.screenshot(), contentType: 'image/png' });
  const jsonPath = testInfo.outputPath('sample.json');
  const textPath = testInfo.outputPath('sample.txt');
  await writeFile(jsonPath, JSON.stringify({ framework: 'Playwright', reporting: 'Allure' }));
  await writeFile(textPath, 'Allure text file attachment');
  await testInfo.attach('JSON file', { path: jsonPath, contentType: 'application/json' });
  await testInfo.attach('Text file', { path: textPath, contentType: 'text/plain' });
});
