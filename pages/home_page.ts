import {Page , expect} from '@playwright/test'

export class HomePage{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async openHomePage(){
        await this.page.goto('/')
    }

    async checkUrl(){
        await this.page.waitForURL('/')
    }

    async checkTitle(){
        await expect(this.page).toHaveTitle('Premier Online - leading provider of online event registration for sports events')
    }
    //другий метод
    async checkTitle2(){
        const title = await this.page.title()
        return title;
    }

}