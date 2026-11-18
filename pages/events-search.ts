import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base_page";

export class SearchPage extends BasePage {
  
    readonly searchInput: Locator
    readonly searchResultPopUp: Locator
    readonly headerSearchResults: Locator
    readonly upcomingEvents: Locator
    readonly pastEvents: Locator
    readonly searchResultTitle: Locator
    readonly searchResultEventBadge: Locator
    readonly noEventsMessage: Locator
    readonly eventPageTitle: Locator
    readonly closeSearchResults: Locator
   


    constructor(page: Page) {
        super(page);

        this.searchInput = page.locator('#search');
        this.searchResultPopUp = page.locator('.livesearch_popup').nth(0);
        this.headerSearchResults = this.searchResultPopUp.locator('.livesearch-header');
        this.upcomingEvents = this.searchResultPopUp.locator('.livesearch_toggle_upcoming');
        this.pastEvents = this.searchResultPopUp.locator('.livesearch_toggle_past');
        this.searchResultTitle = this.searchResultPopUp.locator('#s_ext_events .title');
        this.searchResultEventBadge = this.searchResultPopUp.locator('#s_ext_events td.pointer span.reg-badge');
        this.noEventsMessage = this.searchResultPopUp.getByText("We couldn't find any events at the moment.");
        this.eventPageTitle = this.page.locator('.dtl-title-sec');
        this.closeSearchResults = this.searchResultPopUp.locator('.livesearch_close');
    }

    async checkSearchInput(){
        await this.expectInputReady(this.searchInput, 'Search by Event Name or Organiser', 'Search input')
    }

    async typeInSearchInput(searchTerm: string){
        await this.fill(this.searchInput, searchTerm, 'Search input')
        await this.page.keyboard.press('Enter');
    }

   
    async checkUpcomingEventSearchResults(searchTerm: string){
   
        //check that pop up is opened
        await this.expectVisible(this.searchResultPopUp, 'Search results popup')
        

        //check that upcoming events are selected by default
        await expect(this.upcomingEvents).toHaveClass(/active/)

        //check the result 
        await this.expectText(this.searchResultTitle, searchTerm, 'Search result title')
        await this.expectVisible(this.searchResultEventBadge.nth(1), 'Event date badge')
        await this.expectText(this.searchResultEventBadge.nth(1), /^\d{2}\.\d{2}\.\d{4}$/, 'Event date badge') //checks the date format
        await this.expectVisible(this.searchResultEventBadge.nth(2), 'Event registration badge')
        await this.expectText(this.searchResultEventBadge.nth(2), /\S+/, 'Event registration badge') //checks that it not empty

    }

    async checkPastEventSearchResults(searchTerm: string){
      
        //check that pop up is opened
        await this.expectVisible(this.searchResultPopUp, 'Search results popup')

        //check that upcoming events are selected by default and not results
        await expect(this.upcomingEvents).toHaveClass(/active/)
        await this.expectVisible(this.noEventsMessage, 'No events message')
        
        //click on past events
        await this.click(this.pastEvents, 'Past events tab')

        //check that past events are selected and results are displayed
        await expect(this.pastEvents).toHaveClass(/active/)
        await this.expectText(this.searchResultTitle, searchTerm, 'Search result title')
        await this.expectVisible(this.searchResultEventBadge.nth(1), 'Event date badge')
        await this.expectText(this.searchResultEventBadge.nth(1), /^\d{2}\.\d{2}\.\d{4}$/, 'Event date badge') //checks the date format
        await this.expectVisible(this.searchResultEventBadge.nth(2), 'Event registration badge')
        await this.expectText(this.searchResultEventBadge.nth(2), /\S+/, 'Event registration badge') //checks that it not empty


    }


    async checkNotExistingEvent (){

        //check that pop up is opened
        await this.expectVisible(this.searchResultPopUp, 'Search results popup')

        //check upcoming events 
        await this.click(this.upcomingEvents, 'Upcoming events tab')
        await this.expectVisible(this.noEventsMessage, 'No events message')

        //check past events
        await this.click(this.pastEvents, 'Past events tab')
        await this.expectVisible(this.noEventsMessage, 'No events message')
    }

    async openEventPage(searchTerm: string){
        await this.expectVisible(this.searchResultPopUp, 'Search results popup')
        await this.expectText(this.searchResultTitle, searchTerm, 'Search result title')
        await this.click(this.searchResultTitle, 'Search result title')
        await this.expectVisible(this.eventPageTitle, 'Event page title')
    }
}