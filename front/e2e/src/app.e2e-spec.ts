import { browser, by, element } from 'protractor';

describe('App', () =>
{
    beforeEach(async () =>
    {
        await browser.get('/');
    });

    it('should always show 3A as title', async () =>
    {
        const titles = await element.all(by.css('h1')).map(el => el.getText());

        expect(titles).toEqual([ '3', 'A' ]);
    });

    it('should display random image component when user enter', async () =>
    {
        expect(await element(by.css('app-random-image')).isPresent()).toBe(true);
    });
});
