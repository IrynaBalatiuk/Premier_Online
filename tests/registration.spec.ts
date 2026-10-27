import { expect , test } from '@playwright/test';
import { RegistrationPage, RegistrationData} from '../pages/registration';
import { signupData } from '../config/signup_data';

test.describe('Register to account', () => {

    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
       registrationPage = new RegistrationPage(page);
       await page.goto('/')
       await expect(page).toHaveURL('/')
    });


    test('Create account', async ({page}) => {
        await test.step('Click on create account and check url', async () => {

        
        await registrationPage.openRegistrationPage()
        await expect(registrationPage.centerTitle).toHaveText('Create Account')
        await expect(registrationPage.centerText).toContainText('We ask you to do this once;')
        
        })

        await test.step('Fill registration form and create account', async () => {
            
            //check the fields are visible and enabled and have correct placeholder text
            await expect(registrationPage.emailField).toBeVisible()
            await expect(registrationPage.emailField).toBeEnabled()
            await expect(registrationPage.emailField).toHaveAttribute('placeholder', 'Email: we send your confirmations and receipts here.')

            await expect(registrationPage.firstNameField).toBeVisible()
            await expect(registrationPage.firstNameField).toBeEnabled()
            await expect(registrationPage.firstNameField).toHaveAttribute('placeholder', 'First Name')
    
            await expect(registrationPage.lastNameField).toBeVisible()
            await expect(registrationPage.lastNameField).toBeEnabled()
            await expect(registrationPage.lastNameField).toHaveAttribute('placeholder', 'Last Name')

            await expect(registrationPage.passwordField).toBeVisible()
            await expect(registrationPage.passwordField).toBeEnabled()
            await expect(registrationPage.passwordField).toHaveAttribute('placeholder', 'Password (8 characters alphanumeric)')

            await expect(registrationPage.passwordRepeatField).toBeVisible()
            await expect(registrationPage.passwordRepeatField).toBeEnabled()
            await expect(registrationPage.passwordRepeatField).toHaveAttribute('placeholder', 'Repeat Password')
            
            //fill the registration form with data
            await registrationPage.fillRegistrationForm(signupData);

             //check that the fields have been filled with correct data
             await expect (registrationPage.emailField).toHaveValue(signupData.email)
             await expect (registrationPage.firstNameField).toHaveValue(signupData.firstName)
             await expect (registrationPage.lastNameField).toHaveValue(signupData.lastName)
             await expect (registrationPage.passwordField).toHaveValue(signupData.password)
             await expect (registrationPage.passwordRepeatField).toHaveValue(signupData.password)    
            })
         
            await test.step('Confirm account creation', async () => {
                
            await expect(registrationPage.continueButton).toBeVisible()
            await expect(registrationPage.continueButton).toBeEnabled()
            await registrationPage.confirmAccountCreation()
            

            await test.step('Check that accout created', async () => {
                
            await expect(page).toHaveURL('https://www.premieronline.com/create_profile.php')
            await expect(registrationPage.accountCreationSuccessMessage).toBeVisible()
            
            })

        })

        /*await  test.step('Sing in to account', async () => {
        const signInButton = page.getByRole('button', { name: 'Sign in'})
        await expect(signInButton).toBeVisible()
        await signInButton.click()
        await expect(page).toHaveURL('https://www.premieronline.com/action/dologin')
        await expect(page).toHaveTitle('Login')
        })

        await test.step('Fill the sign in form', async () => {
        
        const emailSignInField = page.locator('#login_name')
        const passwordSignIn = page.locator('#password')
        const signInButton = page.locator('button.uk-button-secondary').nth(2)

        const existingEmail = "xotodem100@aahzz.com"
        await expect(emailSignInField).toBeVisible()
        await expect(emailSignInField).toBeEnabled()
        await expect(emailSignInField).toHaveAttribute('placeholder', 'Email address')
        await emailSignInField.fill(existingEmail)
        await expect(emailSignInField).toHaveValue(existingEmail)

        const existingPassword = "playwrightAuto@456"
        await expect(passwordSignIn).toBeVisible()
        await expect(passwordSignIn).toBeEnabled()
        await expect(passwordSignIn).toHaveAttribute('placeholder', 'Password')
        await passwordSignIn.fill(existingPassword)
        await expect(passwordSignIn).toHaveValue(existingPassword)
    
        await expect(signInButton).toBeVisible()
        await expect(signInButton).toBeEnabled()
        await signInButton.click()
        
        })
        */
    })


})
