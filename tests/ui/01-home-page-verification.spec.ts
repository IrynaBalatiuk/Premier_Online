import { test } from '../fixtures';
import { HomePage } from '../../pages/home-page-verification';
import * as allure from 'allure-js-commons';

test.describe('home page verification', () => {
    test.beforeEach(async () => {
        await allure.epic('Premier Online');
        await allure.feature('Home page');
        await allure.story('Verify home page content');
        await allure.severity('critical');
        await allure.owner('QA');
        await allure.tags('home-page', 'ui');
        await allure.description('Verify the home page URL, title, logo, navigation links, and account buttons.');
    });

    test('open home page', async ({ page }) => {
        const homePage = new HomePage(page);

        await test.step('open page and check that its loaded', async () => {
            await homePage.openHomePage();
            await homePage.checkUrl();
        });

        await test.step('check page title', async () => {
            await homePage.checkTitle();
        });

        await test.step('check logo', async () => {
            await homePage.checkLogo();
        });

        await test.step('Check header', async () => {
            await homePage.checkHeader();
        });
    });
});
