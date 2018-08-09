import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Nl2BrPipeModule } from 'nl2br-pipe';
import { ScrollService } from '../../services/scroll.service';

import { MainPageComponent } from './main-page.component';
import datasMock from '../../models/datas.mock';

import * as moment from 'moment';

describe('MainPageComponent', () =>
{
    let component: MainPageComponent;
    let fixture: ComponentFixture<MainPageComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
                   declarations: [ MainPageComponent ],
                   imports     : [ Nl2BrPipeModule ],
               })
               .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture         = TestBed.createComponent(MainPageComponent);
        component       = fixture.componentInstance;
        component.datas = datasMock;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should display about detail first', () =>
    {
        const firstElementContent = fixture.debugElement.nativeElement.firstChild.textContent;

        expect(firstElementContent).toEqual(datasMock.about);
    });

    it('should display about preview then', () =>
    {
        const secondElementTagName = fixture.debugElement.nativeElement.firstChild.nextSibling.tagName;

        expect(secondElementTagName).toEqual('HEADER');
    });

    it('should display events list then', () =>
    {
        const thirdElementTagName = fixture.debugElement.nativeElement.firstChild.nextSibling.nextSibling.tagName;
        expect(thirdElementTagName).toEqual('UL');

        const eventsNodes = getEventsNodes();
        expect(eventsNodes.length).toEqual(datasMock.events.length);
    });

    it('should display event title and description', () =>
    {
        getEventsNodes().forEach(( eventNode, index ) =>
        {
            const event       = datasMock.events[ index ];
            const name        = eventNode.query(By.css('h2')).nativeElement.textContent;
            const description = eventNode.query(By.css('h4')).nativeElement.textContent;

            expect(name).toEqual(event.name);
            expect(description).toEqual(event.description);
        });
    });

    it('should display future events cover only and passed events images only', () =>
    {
        const now = moment();

        getEventsNodes().forEach(( eventNode, index ) =>
        {
            const images        = eventNode.queryAll(By.css('img')).map(imageNode => imageNode.nativeElement.src);
            const event         = datasMock.events[ index ];
            const eventIsPassed = moment.unix(event.dates[event.dates.length-1].end).isBefore(now);

            // future
            if (!eventIsPassed)
            {
                expect(images).toEqual([ event.cover ]);
            }
            // passed
            else
            {
                expect(images).toEqual(event.images);
            }
        });
    });

    it('should scroll to about preview after view init', fakeAsync(() =>
    {
        const scrollService = TestBed.get(ScrollService) as ScrollService;
        spyOn(scrollService, 'scrollToAbout');

        // manually call angular hook
        component.ngAfterViewInit();

        // make sure spy has not already been called
        expect(scrollService.scrollToAbout).not.toHaveBeenCalled();

        // advance time
        tick(50);

        // check spy was called
        expect(scrollService.scrollToAbout).toHaveBeenCalled();
    }));

    it('should scroll to top when about preview is clicked', () =>
    {
        const scrollService    = TestBed.get(ScrollService) as ScrollService;
        const aboutPreviewNode = fixture.debugElement.query(By.css('header'));
        spyOn(scrollService, 'scrollTop');

        // click on about preview
        aboutPreviewNode.triggerEventHandler('click', null);

        expect(scrollService.scrollTop).toHaveBeenCalled();
    });


    //
    // UTILS
    //

    function getEventsNodes ()
    {
        return fixture.debugElement.queryAll(By.css('ul > li'));
    }
});
