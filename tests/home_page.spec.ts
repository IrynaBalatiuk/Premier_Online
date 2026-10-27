import {expect, test} from '@playwright/test'

test.describe('home page verification',() => {

   test('open home page', async ({page})  => {

    await test.step('open page and check that its loaded', async () => {

    await page.goto('/')
    await expect(page).toHaveURL('/')
        })


    await test.step('check page title' , async () => {

    await expect(page).toHaveTitle('Premier Online - leading provider of online event registration for sports events')
        })
    await test.step('check logo' , async () => {
    const logo = page.locator('.uk-logo')
    await expect(logo).toBeVisible()
    await expect(logo).toHaveAttribute('href', 'https://www.premieronline.com')
    const logoLink = page.getByRole('link', { name: 'Premiere Online' });  
    const logoImg = logoLink.getByRole('img');
    await expect(logoImg).toHaveAttribute('alt','Premiere Online')
    await expect(logoImg).toHaveAttribute('src', 'https://www.premieronline.com/assets/img/logo.svg')
       })

       await test.step('Check header' , async () => {
       const nav = page.locator('ul.uk-navbar-nav').nth(0)

       await expect(nav.locator('a', { hasText: 'Events' })) 
            .toHaveAttribute('href', 'https://www.premieronline.com/calendar')
            await expect(nav.locator('a', { hasText: 'Events' })) .toBeVisible()   
           

        await expect(nav.locator('a', { hasText: 'Ratings' })) 
            .toHaveAttribute('href', 'https://www.premieronline.com/event_ratings.php');
            await expect(nav.locator('a', { hasText: 'Ratings' })).toBeVisible()

         await expect(nav.locator('a', { hasText: 'Help' })) 
            .toHaveAttribute('href', 'https://www.premieronline.com/help');
            await expect(nav.locator('a', { hasText: 'Help' })).toBeVisible()
           

            
        const sighInButton = page.getByRole('button', { name: 'Sign in'})
        await expect(sighInButton).toBeVisible()
        const accountButton = page.getByRole('button', {name: "Create account"})
        await expect(accountButton).toBeVisible()
        })
    })
})

