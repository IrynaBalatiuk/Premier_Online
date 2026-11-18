import { expect , test } from '../fixtures';
import { RegistrationPage, RegistrationData} from '../../pages/user-registration';
import { signupData } from '../../config/signup_data';
import * as allure from 'allure-js-commons';

test.describe('Register to account', () => {

    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
       await allure.epic('Premier Online');
       await allure.feature('Registration');
       await allure.story('Create an account');
       await allure.severity('critical');
       await allure.owner('QA');
       await allure.tags('registration', 'ui');
       await allure.description('Create an account through the registration form and verify the success message.');
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
            
            await registrationPage.fillRegistrationForm(signupData);

            
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

    
    })


})
