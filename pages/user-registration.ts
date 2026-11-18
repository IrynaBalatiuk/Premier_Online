import { Locator, expect, Page } from '@playwright/test';
import { BasePage } from './base_page';


export interface RegistrationData {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    passwordRepeat?: string;
}

export class RegistrationPage extends BasePage {
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
        super(page);
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
        
        await this.click(this.accountButton, 'Create Account button');
        await this.expectUrl('https://www.premieronline.com/action/register');
       

    }
    async fillRegistrationForm(data: RegistrationData) {

        await this.fill(this.emailField, data.email, 'Email field');
        await this.fill(this.firstNameField, data.firstName, 'First Name field');
        await this.fill(this.lastNameField, data.lastName, 'Last Name field');
        await this.fill(this.passwordField, data.password, 'Password field');
        await this.fill(this.passwordRepeatField, data.passwordRepeat ?? data.password, 'Repeat Password field');


    }

    async confirmAccountCreation() {
        await this.click(this.continueButton, 'Continue button');
    }
}
