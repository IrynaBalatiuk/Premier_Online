import { test as base, expect } from '@playwright/test';
import { open } from 'node:fs/promises';
import { Logger } from '../utils/logger';

// Auto fixture also runs for API tests without starting a browser.
export const test = base.extend<{ reporting: void }>({
  reporting: [async ({}, use, testInfo) => {
    // Read only this test's slice of the worker log; workers run one test at a time.
    const log = await open(Logger.logFile, 'r').catch(() => undefined);
    const offset = log ? (await log.stat()).size : 0;
    try {
      await use();
    } finally {
      try {
        const current = log ?? await open(Logger.logFile, 'r').catch(() => undefined);
        if (current) {
          try {
            const length = (await current.stat()).size - offset;
            if (length > 0) {
              const buffer = Buffer.alloc(length);
              const { bytesRead } = await current.read(buffer, 0, length, offset);
              await testInfo.attach('Worker log', { body: buffer.subarray(0, bytesRead), contentType: 'text/plain' });
            }
          } finally {
            if (current !== log) await current.close();
          }
        }
        if (testInfo.status !== testInfo.expectedStatus) {
          await testInfo.attach('Failure diagnostics', {
            body: JSON.stringify({
              title: testInfo.titlePath,
              project: testInfo.project.name,
              retry: testInfo.retry,
              status: testInfo.status,
              errors: testInfo.errors.map(error => ({ message: error.message, stack: error.stack })),
            }, null, 2),
            contentType: 'application/json',
          });
        }
      } finally {
        await log?.close();
      }
    }
  }, { auto: true }],
});

export { expect };
