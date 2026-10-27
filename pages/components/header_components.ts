import {Page, expect , Locator} from '@playwright/test'


export class HeaderComponents{

    readonly page: Page

    readonly logoLink: Locator
    readonly logoImg: Locator
    readonly nav: Locator
    readonly signInButton: Locator
    readonly createAccountButton: Locator

    constructor(page: Page){
        
        this.page = page

        this.logoLink = page.getByRole('link', { name: 'Premiere Online' })
        this.logoImg = this.logoLink.getByRole('img')
        this.nav = page.locator('ul.uk-navbar-nav').nth(0)
        this.signInButton = page.getByRole('button', { name: 'Sign In' })
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
    }

    async checkLogo(){
        await expect(this.logoLink).toBeVisible()
        await expect(this.logoLink).toHaveAttribute('href', 'https://www.premieronline.com')
        await expect(this.logoImg).toHaveAttribute('alt','Premiere Online')
        await expect(this.logoImg).toHaveAttribute('src', 'https://www.premieronline.com/assets/img/logo.svg')
    }
   
     async checkMenuItems(){
        await expect(this.nav.locator('a', { hasText: 'Events' })).toBeVisible()
        await expect(this.nav.locator('a', { hasText: 'Events' })).toHaveAttribute('href', 'https://www.premieronline.com/calendar')
        await expect(this.nav.locator('a', { hasText: 'Ratings' })).toBeVisible()
        await expect(this.nav.locator('a', { hasText: 'Ratings' })).toHaveAttribute('href', 'https://www.premieronline.com/event_ratings.php')
        await expect(this.nav.locator('a', { hasText: 'Help' })).toBeVisible()
        await expect(this.nav.locator('a', { hasText: 'Help' })).toHaveAttribute('href', 'https://www.premieronline.com/help')
        await expect(this.nav.locator('a', { hasText: ' عربى' })).toBeVisible()
        await expect(this.nav.locator('a', { hasText: ' عربى' })).toHaveAttribute('href', 'https://www.premieronline.com/action/lang.php?lang=arc')
    }

    //async checkSearchInput(){
        //await expect(this.searchInput).toBeVisible()
        //await expect(this.searchInput).toBeEnabled()
        //await expect(this.searchInput).toHaveAttribute('placeholder', 'Search by Event Name or Organiser')

    //}

    async checkSignInButton(){
        await expect(this.signInButton).toBeVisible()
        await expect(this.signInButton).toBeEnabled()
    }

    async checkCreateAccountButton(){
        await expect(this.createAccountButton).toBeVisible()
        await expect(this.createAccountButton).toBeEnabled()
    }

    async clickSignInButton(){
        await this.signInButton.click()
    }

    async clickCreateAccountButton(){
        await this.createAccountButton.click()
    }

    //async typeInSearchInput(searchTerm: string){
    //    await this.searchInput.fill(searchTerm)
    //}
    
    }
