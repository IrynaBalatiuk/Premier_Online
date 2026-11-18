import { test } from '../fixtures';
import { SearchPage } from '../../pages/events-search';

test.describe('Events search', () => {

    let searchPage: SearchPage;

    test.beforeEach(async ({ page }) => {
        searchPage = new SearchPage(page);
        await searchPage.goto('/')
        await searchPage.expectUrl('/')
    })

    
    test('Search for upcoming events', async ({ page }) => {
        await test.step('Check search input', async () => {
            await searchPage.checkSearchInput()
        })
    
        await test.step('Type in search input', async () => {
            await searchPage.typeInSearchInput('IRONSTAR Egypt 2027')
            await searchPage.checkUpcomingEventSearchResults('IRONSTAR Egypt 2027')
            await searchPage.click(searchPage.closeSearchResults, 'Close search results')
        })
    })

    test('Search for past events', async ({ page }) => {
        await test.step('Type in search input', async () => {
            await searchPage.typeInSearchInput('JAFZA FitFest 2025')
            await searchPage.checkPastEventSearchResults('JAFZA FitFest 2025')
            await searchPage.click(searchPage.closeSearchResults, 'Close search results')
        })
    })

    test('Search for not existing events', async ({ page }) => {
        await test.step('Type in search input', async () => {
            await searchPage.typeInSearchInput('Not existing event')
            await searchPage.checkNotExistingEvent()
            await searchPage.click(searchPage.closeSearchResults, 'Close search results')
        })

    })

   test('Open event page from search results', async ({ page }) => {
        await test.step('Type in search input', async () => {
            await searchPage.typeInSearchInput('Saqqara Half Marathon 2027')
            await searchPage.checkUpcomingEventSearchResults('Saqqara Half Marathon 2027')
            await searchPage.click(searchPage.searchResultEventBadge.nth(0), 'Click on event from search results')
            await searchPage.expectVisible(searchPage.eventPageTitle, 'Event page title')
        })

    })
})
