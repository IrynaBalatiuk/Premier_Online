import { expect, test } from '@playwright/test';
import { SignupPage } from '../pages/signup';
import { signupData as data } from '../config/signup_data';

test.describe('Dashboard signup', () => {
    test('displays and fills the signup form', async ({ page }) => {
        const signup = new SignupPage(page);

        await test.step('Open signup and verify the form', async () => {
            await signup.openRegistrationPage();
            await expect(page).toHaveURL('https://dash.premieronline.com/signup');
            await expect(signup.centerTitle).toHaveText('Sign Up');
            await expect(signup.centerText).toBeVisible();

            await expect(signup.emailField).toBeVisible();
            await expect(signup.emailField).toBeEditable();
            await expect(signup.emailField).toHaveAttribute('placeholder', 'Email Id');

            await expect(signup.firstNameField).toBeVisible();
            await expect(signup.firstNameField).toBeEditable();
            await expect(signup.firstNameField).toHaveAttribute('placeholder', 'First Name');

            await expect(signup.lastNameField).toBeVisible();
            await expect(signup.lastNameField).toBeEditable();
            await expect(signup.lastNameField).toHaveAttribute('placeholder', 'Last Name');

            await expect(signup.passwordField).toBeVisible();
            await expect(signup.passwordField).toBeEditable();
            await expect(signup.passwordField).toHaveAttribute('placeholder', 'Password');

            await expect(signup.passwordRepeatField).toBeVisible();
            await expect(signup.passwordRepeatField).toBeEditable();
            await expect(signup.passwordRepeatField).toHaveAttribute('placeholder', 'Confirm Password');

            await expect(signup.passwordField).toHaveAttribute('type', 'password');
            await expect(signup.passwordRepeatField).toHaveAttribute('type', 'password');
        });

        await test.step('Fill the form using inherited actions', async () => {
            await signup.fillRegistrationForm(data);
            await expect(signup.emailField).toHaveValue(data.email);
            await expect(signup.firstNameField).toHaveValue(data.firstName);
            await expect(signup.lastNameField).toHaveValue(data.lastName);
            await expect(signup.passwordField).toHaveValue(data.password);
            await expect(signup.passwordRepeatField).toHaveValue(data.password);
            await expect(signup.continueButton).toBeVisible();
            await expect(signup.continueButton).toBeEnabled();
        });
    });
});

