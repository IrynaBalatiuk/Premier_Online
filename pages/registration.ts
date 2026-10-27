import { Locator, expect, Page } from '@playwright/test';


export interface RegistrationData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordRepeat?: string;
}

export class RegistrationPage {
    readonly accountButton: Locator;
    readonly emailField: Locator;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly passwordField: Locator;
    readonly passwordRepeatField: Locator;
    readonly continueButton: Locator;
    readonly centerTitle: Locator;
    readonly centerText: Locator;
    readonly accountCreationSuccessMessage: Locator;

    constructor(readonly page: Page) {
        this.accountButton = page.getByRole('button', { name: 'Create Account', exact: true });
        this.emailField = page.locator('#email');
        this.firstNameField = page.locator('#first_name');
        this.lastNameField = page.locator('#last_name');
        this.passwordField = page.locator('#password');
        this.passwordRepeatField = page.locator('#password_repeat');
        this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
        this.centerTitle = page.locator('h1.uk-text-center.title');
        this.centerText = page.locator('.sub-title.uk-text-center');
        this.accountCreationSuccessMessage = page.locator('.uk-alert-success');
    }

    async openRegistrationPage() {
        await expect(this.accountButton).toBeVisible();
        await this.accountButton.click();
        await expect(this.page).toHaveURL('https://www.premieronline.com/action/register');

    }

    async fillRegistrationForm(data: RegistrationData) {
        await this.emailField.fill(data.email);
        await this.firstNameField.fill(data.firstName);
        await this.lastNameField.fill(data.lastName);
        await this.passwordField.fill(data.password);
        await this.passwordRepeatField.fill(data.passwordRepeat ?? data.password);
    }

    async confirmAccountCreation() {
        await this.continueButton.click();
    }
}
