import { rm } from 'node:fs/promises';
import path from 'node:path';

export default async function globalSetup() {
  // Clean once per run, before workers start (also applies to IDE runs).
  await rm(path.resolve(__dirname, '../allure-results'), { recursive: true, force: true });
}
