import { expect, test } from '@playwright/test';
import { AuthorizationPage } from '../pages/authorization';
import { signupData } from '../config/signup_data';

test.describe('Authorization to account', () => {

    let authorizationPage: AuthorizationPage;

    test.beforeEach(async ({ page }) => {
        authorizationPage = new AuthorizationPage(page);
        await page.goto('/')
        await expect(page).toHaveURL('/')
    });
 
    test('Sign in to account', async ({ page }) => {
        await test.step('Click on sign in and check url', async () => {

            await expect(authorizationPage.signInButton).toBeVisible()
            await authorizationPage.openAuthorization()
            await expect(authorizationPage.page).toHaveURL('https://www.premieronline.com/action/dologin')
            await expect(authorizationPage.page).toHaveTitle('Login')
            await expect(authorizationPage.sighInTitle).toHaveText('Sign in')
            await expect(authorizationPage.sighInPageText).toHaveText('Your personal details are protected in accordance with our Privacy Policy.')
           
        })

        await test.step('Failed sign in', async () => {

            await expect(authorizationPage.emailSignInField).toBeVisible()
            await expect(authorizationPage.emailSignInField).toBeEnabled()
            await expect(authorizationPage.registrationPage.passwordField).toBeVisible()
            await expect(authorizationPage.registrationPage.passwordField).toBeEnabled()
            await authorizationPage.fillAuthorizationForm('fake_email56756@gmail.com', 'fake_password')
            
            await authorizationPage.confirmAuthorization()
            await expect(authorizationPage.page).toHaveTitle('Login')
            await expect(authorizationPage.wrongCredentialsError).toContainText('Sorry, you were not recognized')

        })

        await test.step('Successful sign in', async () => {

            await authorizationPage.fillAuthorizationForm(signupData.email, signupData.password)
            await authorizationPage.confirmAuthorization()
        })

    })

})