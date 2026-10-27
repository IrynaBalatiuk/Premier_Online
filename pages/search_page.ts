import { Page, Locator, expect } from "@playwright/test";

export class SearchPage {
    readonly page: Page 
  
    readonly searchInput: Locator
    readonly searchResultPopUp: Locator
    readonly headerSearchResults: Locator
    readonly upcomingEvents: Locator
    readonly pastEvents: Locator
    readonly searchResultTitle: Locator
    readonly searchResultEventBadge: Locator
    readonly noEventsMessage: Locator
    readonly eventPageTitle: Locator
   


    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.locator('#search');
        this.searchResultPopUp = page.locator('.livesearch_popup').nth(0);
        this.headerSearchResults = this.searchResultPopUp.locator('.livesearch-header');
        this.upcomingEvents = this.searchResultPopUp.locator('.livesearch_toggle_upcoming active');
        this.pastEvents = this.searchResultPopUp.locator('.livesearch_toggle_past');
        this.searchResultTitle = this.searchResultPopUp.locator('#s_ext_events .title');
        this.searchResultEventBadge = this.searchResultPopUp.locator('#s_ext_events td.pointer span.reg-badge');
        this.noEventsMessage = this.searchResultPopUp.getByText("We couldn't find any events at the moment.");
        this.eventPageTitle = this.page.locator('.dtl-title-sec');
    }

    async checkSearchInput(){
        await expect(this.searchInput).toBeVisible()
        await expect(this.searchInput).toBeEnabled()
        await expect(this.searchInput).toHaveAttribute('placeholder', 'Search by Event Name or Organiser')
    }

    async typeInSearchInput(searchTerm: string){
        await this.searchInput.fill(searchTerm)
        await expect(this.searchInput).toHaveValue(searchTerm)
    }

   
    async checkUpcomingEventSearchResults(searchTerm: string){
   
        //check that pop up is opened
        await expect(this.searchResultPopUp).toBeVisible()
        

        //check that upcoming events are selected by default
        await expect(this.upcomingEvents).toHaveClass(/active/)

        //check the result 
        await expect(this.searchResultTitle).toHaveText(searchTerm)
        await expect(this.searchResultEventBadge.nth(1)).toBeVisible()
        await expect(this.searchResultEventBadge.nth(1)).toHaveText('/^\d{2}\.\d{2}\.\d{4}$/') //checks the date format
        await expect(this.searchResultEventBadge.nth(2)).toBeVisible()
        await expect(this.searchResultEventBadge.nth(2)).toHaveText('/\S+/') //checks that it not empty

    }

    async checkPastEventSearchResults(searchTerm: string){
      
        //check that pop up is opened
        await expect(this.searchResultPopUp).toBeVisible()

        //check that upcoming events are selected by default and not results
        await expect(this.upcomingEvents).toHaveClass(/active/)
        await expect(this.noEventsMessage).toBeVisible()
        
        //click on past events
        await this.pastEvents.click()

        //check that past events are selected and results are displayed
        await expect(this.pastEvents).toHaveClass(/active/)
        await expect(this.searchResultTitle).toHaveText(searchTerm)
        await expect(this.searchResultEventBadge.nth(1)).toBeVisible()
        await expect(this.searchResultEventBadge.nth(1)).toHaveText('/^\d{2}\.\d{2}\.\d{4}$/') //checks the date format
        await expect(this.searchResultEventBadge.nth(2)).toBeVisible()
        await expect(this.searchResultEventBadge.nth(2)).toHaveText('/\S+/') //checks that it not empty


    }


    async checkNotExistingEvent (){

        //check that pop up is opened
        await expect(this.searchResultPopUp).toBeVisible()

        //check upcoming events 
        await this.upcomingEvents.click()
        await expect(this.noEventsMessage).toBeVisible()

        //check past events
        await this.pastEvents.click()
        await expect(this.noEventsMessage).toBeVisible()
    }

    async openEventPage(searchTerm: string){
        await expect(this.searchResultPopUp).toBeVisible()
        await expect(this.searchResultTitle).toHaveText(searchTerm)
        await this.searchResultTitle.click()
        await expect(this.eventPageTitle).toBeVisible()
    }
}