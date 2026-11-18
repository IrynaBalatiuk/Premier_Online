import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base_page";
import { RegistrationPage } from "./user-registration";

export class AuthorizationPage extends BasePage {

    readonly signInButton: Locator
    readonly emailSignInField: Locator
    readonly registrationPage: RegistrationPage
    readonly signInSubmitButton: Locator
    readonly sighInTitle: Locator
    readonly sighInPageText: Locator
    readonly wrongCredentialsError: Locator

    constructor(page: Page) {
        super(page);

        this.signInButton = page.getByRole('button', { name: 'Sign in' })
        this.emailSignInField = page.locator('#login_name')
        this.signInSubmitButton = page.locator('button.uk-button-secondary').nth(2)
        this.sighInTitle = page.locator('h2.uk-text-center')
        this.sighInPageText = page.locator('.sub-title.uk-text-center')
        this.registrationPage = new RegistrationPage(page)
        this.wrongCredentialsError = page.getByText('Sorry, you were not recognized', { exact: false })
    }


    async openAuthorization() {

        await this.click(this.signInButton, 'Sign in button')

    }

    async fillAuthorizationForm(email: string, password: string) {


        await this.fill(this.emailSignInField, email, 'Sign-in email field')
        await this.fill(this.registrationPage.passwordField, password, 'Sign-in password field')
    }

    async confirmAuthorization() {
        await this.click(this.signInSubmitButton, 'Sign-in submit button')


    }


}
