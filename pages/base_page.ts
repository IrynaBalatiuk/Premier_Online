import { Locator, Page, expect, test } from '@playwright/test';
import { Logger } from '../utils/logger';
 
export class BasePage {
    protected readonly logger: Logger;
 
    constructor(readonly page: Page) {
        this.logger = new Logger(this.constructor.name);
    }
 
    // ───────────── Ядро ─────────────
 
   
    protected async performAction<T>(
        description: string,
        action: () => Promise<T>
    ): Promise<T> {
        return await test.step(description, async () => {
            const start = Date.now();
            this.logger.debug(`START: ${description}`);
            try {
                const result = await action();
                this.logger.info(`${description} (${Date.now() - start} ms)`);
                return result;
            } catch (error) {
                this.logger.error(`FAILED: ${description} (${Date.now() - start} ms)`, error);
                await this.attachScreenshot(description);
                throw error; // тест має впасти
            }
        });
    }
 

    protected async tryAction(
        description: string,
        action: () => Promise<void>
    ): Promise<boolean> {
        try {
            await action();
            this.logger.info(description);
            return true;
        } catch (error) {
            this.logger.warn(`Skipped: ${description} — ${(error as Error).message.split('\n')[0]}`);
            return false;
        }
    }
 
    private async attachScreenshot(description: string) {
        try {
            const screenshot = await this.page.screenshot({ fullPage: true });
            await test.info().attach(`Failed: ${description}`, {
                body: screenshot,
                contentType: 'image/png',
            });
            this.logger.debug('Screenshot attached to report');
        } catch (e) {
            this.logger.warn(`Screenshot not taken: ${(e as Error).message}`);
        }
    }
 
    // ───────────── Навігація ─────────────
 
    async goto(url: string) {
        await this.performAction(`Go to ${url}`, async () => {
            await this.page.goto(url);
        });
    }
 
    async reload() {
        await this.performAction('Reload page', async () => {
            await this.page.reload();
        });
    }
 
    async goBack() {
        await this.performAction('Go back', async () => {
            await this.page.goBack();
        });
    }
 
    // ───────────── Дії ─────────────
 
    async click(locator: Locator, name = 'element') {
        await this.performAction(`Click on ${name}`, async () => {
            await expect(locator).toBeVisible();
            await expect(locator).toBeEnabled();
            await locator.click();
        });
    }
 
    async doubleClick(locator: Locator, name = 'element') {
        await this.performAction(`Double click on ${name}`, async () => {
            await locator.dblclick();
        });
    }
 
    async hover(locator: Locator, name = 'element') {
        await this.performAction(`Hover over ${name}`, async () => {
            await locator.hover();
        });
    }
 
    async fill(locator: Locator, value: string, name = 'field') {
        await this.performAction(`Fill ${name}`, async () => {
            await expect(locator).toBeVisible();
            await expect(locator).toBeEnabled();
            await locator.fill(value);
            await expect(locator).toHaveValue(value);
        });
    }
 
    async clear(locator: Locator, name = 'field') {
        await this.performAction(`Clear ${name}`, async () => {
            await locator.clear();
        });
    }
 
    async pressKey(locator: Locator, key: string, name = 'element') {
        await this.performAction(`Press "${key}" on ${name}`, async () => {
            await locator.press(key);
        });
    }
 
    async selectOption(locator: Locator, value: string, name = 'dropdown') {
        await this.performAction(`Select "${value}" in ${name}`, async () => {
            await locator.selectOption(value);
        });
    }
 
    async check(locator: Locator, name = 'checkbox') {
        await this.performAction(`Check ${name}`, async () => {
            await locator.check();
            await expect(locator).toBeChecked();
        });
    }
 
    async uncheck(locator: Locator, name = 'checkbox') {
        await this.performAction(`Uncheck ${name}`, async () => {
            await locator.uncheck();
            await expect(locator).not.toBeChecked();
        });
    }
 
    async uploadFile(locator: Locator, filePath: string, name = 'file input') {
        await this.performAction(`Upload file to ${name}`, async () => {
            await locator.setInputFiles(filePath);
        });
    }
 
    async scrollTo(locator: Locator, name = 'element') {
        await this.performAction(`Scroll to ${name}`, async () => {
            await locator.scrollIntoViewIfNeeded();
        });
    }
 
    // ───────────── Читання даних ─────────────
 
    async getText(locator: Locator, name = 'element'): Promise<string> {
        return await this.performAction(`Get text of ${name}`, async () => {
            return (await locator.innerText()).trim();
        });
    }
 
    async getValue(locator: Locator, name = 'field'): Promise<string> {
        return await this.performAction(`Get value of ${name}`, async () => {
            return await locator.inputValue();
        });
    }
 
    async getAttribute(locator: Locator, attr: string, name = 'element'): Promise<string | null> {
        return await this.performAction(`Get "${attr}" of ${name}`, async () => {
            return await locator.getAttribute(attr);
        });
    }
 
    async isVisible(locator: Locator, name = 'element'): Promise<boolean> {
        try {
            const visible = await locator.isVisible();
            this.logger.debug(`${name} visible: ${visible}`);
            return visible;
        } catch (error) {
            this.logger.error(`Cannot check visibility of ${name}`, error);
            return false;
        }
    }
 
    // ───────────── Перевірки ─────────────
 
    async expectVisible(locator: Locator, name = 'element') {
        await this.performAction(`Expect ${name} is visible`, async () => {
            await expect(locator).toBeVisible();
        });
    }
 
    async expectHidden(locator: Locator, name = 'element') {
        await this.performAction(`Expect ${name} is hidden`, async () => {
            await expect(locator).toBeHidden();
        });
    }
 
    async expectEnabled(locator: Locator, name = 'element') {
        await this.performAction(`Expect ${name} is enabled`, async () => {
            await expect(locator).toBeEnabled();
        });
    }
 
    async expectDisabled(locator: Locator, name = 'element') {
        await this.performAction(`Expect ${name} is disabled`, async () => {
            await expect(locator).toBeDisabled();
        });
    }
 
    async expectText(locator: Locator, text: string | RegExp, name = 'element') {
        await this.performAction(`Expect ${name} has text "${text}"`, async () => {
            await expect(locator).toHaveText(text);
        });
    }
 
    async expectContainText(locator: Locator, text: string | RegExp, name = 'element') {
        await this.performAction(`Expect ${name} contains "${text}"`, async () => {
            await expect(locator).toContainText(text);
        });
    }
 
    async expectValue(locator: Locator, value: string, name = 'field') {
        await this.performAction(`Expect ${name} has value "${value}"`, async () => {
            await expect(locator).toHaveValue(value);
        });
    }
 
    async expectAttribute(locator: Locator, attr: string, value: string | RegExp, name = 'element') {
        await this.performAction(`Expect ${name} has ${attr}="${value}"`, async () => {
            await expect(locator).toHaveAttribute(attr, value);
        });
    }
 
    async expectUrl(url: string | RegExp) {
        await this.performAction(`Expect URL ${url}`, async () => {
            await expect(this.page).toHaveURL(url);
        });
    }
 
    async expectTitle(title: string | RegExp) {
        await this.performAction(`Expect title ${title}`, async () => {
            await expect(this.page).toHaveTitle(title);
        });
    }
 
   
    async expectInputReady(locator: Locator, placeholder: string, name = 'field') {
        await this.performAction(`Check ${name} is ready`, async () => {
            await expect(locator).toBeVisible();
            await expect(locator).toBeEnabled();
            await expect(locator).toHaveAttribute('placeholder', placeholder);
        });
    }
}