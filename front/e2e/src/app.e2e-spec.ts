import { getDebugNode } from '@angular/core';
import { browser, by, element, protractor } from 'protractor';
import { DatasModel } from '../../src/app/models/datas.model';
import { ImageModel } from '../../src/app/models/image.model';

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

    it('should display main page when random image is clicked and random image should be hidden', async () =>
    {
        // on enter, only random image should be displayed
        expect(await element(by.css('app-random-image')).isPresent()).toBeTruthy();
        expect(await element(by.css('app-main-page')).isPresent()).toBeFalsy();

        await element(by.css('app-random-image img')).click();

        // after click, only main page should be displayed
        expect(await element(by.css('app-random-image')).isPresent()).toBeFalsy();
        expect(await element(by.css('app-main-page')).isPresent()).toBeTruthy();
    });
});
