import { Page, Locator, expect } from "@playwright/test";
import { RegistrationPage } from "./registration";

export class AuthorizationPage {
    readonly page: Page

    readonly signInButton: Locator
    readonly emailSignInField: Locator
    readonly registrationPage: RegistrationPage
    readonly signInSubmitButton: Locator
    readonly sighInTitle: Locator
    readonly sighInPageText: Locator
    readonly wrongCredentialsError: Locator

constructor(page: Page) {
        this.page = page;

        this.signInButton = page.getByRole('button', { name: 'Sign in'})
        this.emailSignInField = page.locator('#login_name')
       this.signInSubmitButton = page.locator('button.uk-button-secondary').nth(2)
       this.sighInTitle = page.locator('h2.uk-text-center')
       this.sighInPageText = page.locator('.sub-title.uk-text-center')
       this.registrationPage = new RegistrationPage(page)
       this.wrongCredentialsError = page.getByText('Sorry, you were not recognized' , { exact: false })
    }


async openAuthorization() {
        
        await this.signInButton.click()
        
    }

    async fillAuthorizationForm(email: string, password: string) {

        
        await this.emailSignInField.fill(email)
        await this.registrationPage.passwordField.fill(password)
    }

    async confirmAuthorization() {
        await expect(this.signInSubmitButton).toBeVisible()
        await this.signInSubmitButton.click()
        

    }


    }