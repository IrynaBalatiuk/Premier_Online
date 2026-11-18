import { test } from '../fixtures';
import { AuthorizationPage } from '../../pages/user-sing-in';
import { signupData } from '../../config/signup_data';

test.describe('Authorization to account', () => {

    let authorizationPage: AuthorizationPage;

    test.beforeEach(async ({ page }) => {
        authorizationPage = new AuthorizationPage(page);
        await authorizationPage.goto('/')
        await authorizationPage.expectUrl('/')
    });
 
    test('Sign in to account', async () => {
        await test.step('Click on sign in and check url', async () => {

            await authorizationPage.openAuthorization()
            await authorizationPage.expectUrl('https://www.premieronline.com/action/dologin')
            await authorizationPage.expectTitle('Login')
            await authorizationPage.expectText(authorizationPage.sighInTitle, 'Sign in', 'Sign-in title')
            await authorizationPage.expectText(authorizationPage.sighInPageText, 'Your personal details are protected in accordance with our Privacy Policy.', 'Sign-in privacy text')
           
        })

        await test.step('Failed sign in', async () => {

            await authorizationPage.fillAuthorizationForm('fake_email56756@gmail.com', 'fake_password')
            
            await authorizationPage.confirmAuthorization()
            await authorizationPage.expectTitle('Login')
            await authorizationPage.expectContainText(authorizationPage.wrongCredentialsError, 'Sorry, you were not recognized', 'Wrong credentials error')

        })

        await test.step('Successful sign in', async () => {

            await authorizationPage.fillAuthorizationForm(signupData.email, signupData.password)
            await authorizationPage.confirmAuthorization()
        })

    })

})
