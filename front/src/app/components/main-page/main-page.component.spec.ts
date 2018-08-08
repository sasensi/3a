import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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
            const eventIsPassed = moment.unix(event.end).isBefore(now);

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


    //
    // UTILS
    //

    function getEventsNodes ()
    {
        return fixture.debugElement.queryAll(By.css('ul > li'));
    }
});
