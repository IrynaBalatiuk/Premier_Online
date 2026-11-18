import { Locator, Page } from '@playwright/test';
import { BasePage } from './base_page';

export class HomePage extends BasePage {
    readonly logo: Locator;
    readonly logoImg: Locator;
    readonly eventsLink: Locator;
    readonly ratingsLink: Locator;
    readonly helpLink: Locator;
    readonly signInButton: Locator;
    readonly createAccountButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logo = page.locator('.uk-logo');
        this.logoImg = page.getByRole('link', { name: 'Premiere Online' }).getByRole('img');
        const nav = page.locator('ul.uk-navbar-nav').nth(0);
        this.eventsLink = nav.locator('a', { hasText: 'Events' });
        this.ratingsLink = nav.locator('a', { hasText: 'Ratings' });
        this.helpLink = nav.locator('a', { hasText: 'Help' });
        this.signInButton = page.getByRole('button', { name: 'Sign in' });
        this.createAccountButton = page.getByRole('button', { name: 'Create account' });
    }

    async openHomePage() {
        await this.goto('/');
    }

    async checkUrl() {
        await this.expectUrl('/');
    }

    async checkTitle() {
        await this.expectTitle('Premier Online - leading provider of online event registration for sports events');
    }

    async checkLogo() {
        await this.expectVisible(this.logo, 'Logo');
        await this.expectAttribute(this.logo, 'href', 'https://www.premieronline.com', 'Logo');
        await this.expectAttribute(this.logoImg, 'alt', 'Premiere Online', 'Logo image');
        await this.expectAttribute(this.logoImg, 'src', 'https://www.premieronline.com/assets/img/logo.svg', 'Logo image');
    }

    async checkHeader() {
        await this.expectAttribute(this.eventsLink, 'href', 'https://www.premieronline.com/calendar', 'Events link');
        await this.expectVisible(this.eventsLink, 'Events link');
        await this.expectAttribute(this.ratingsLink, 'href', 'https://www.premieronline.com/event_ratings.php', 'Ratings link');
        await this.expectVisible(this.ratingsLink, 'Ratings link');
        await this.expectAttribute(this.helpLink, 'href', 'https://www.premieronline.com/help', 'Help link');
        await this.expectVisible(this.helpLink, 'Help link');
        await this.expectVisible(this.signInButton, 'Sign in button');
        await this.expectVisible(this.createAccountButton, 'Create account button');
    }

    async checkTitle2() {
        return await this.page.title();
    }
}
