import { RegistrationPage } from './registration';

export class SignupPage extends RegistrationPage {
    override readonly passwordRepeatField = this.page.locator('#confirmPassword');
    override readonly continueButton = this.page.getByRole('button', { name: 'Signup', exact: true });
    override readonly centerTitle = this.page.getByRole('heading', { name: 'Sign Up', exact: true });
    override readonly centerText = this.page.getByText('Create your account below.', { exact: true });

    override async openRegistrationPage() {
        await this.page.goto('https://dash.premieronline.com/signup');
    }
}
