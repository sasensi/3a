import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit, QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { DatasModel } from '../../models/datas.model';
import { EventModel } from '../../models/event.model';
import * as moment from 'moment';
import { ScrollService } from '../../services/scroll.service';

declare const $: any;

@Component({
    selector   : 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls  : [ './main-page.component.scss' ],
})
export class MainPageComponent implements OnInit, AfterViewInit
{
    @Input() datas: DatasModel;

    @ViewChild('aboutPreview') aboutPreview: ElementRef;
    @ViewChildren('eventWrapper') eventWrappers: QueryList<ElementRef>;

    constructor ( private scrollService: ScrollService,
                  private elementRef: ElementRef )
    {
    }

    ngOnInit ()
    {
    }

    ngAfterViewInit ()
    {
        // add a slight delay before setting scroll to make sure content is really loaded
        window.setTimeout(() =>
        {
            this.scrollService.scrollToAbout(false);
        }, 50);

        // add sticky effect on dates
        $(this.elementRef.nativeElement)
            .find('h3')
            .stick_in_parent({
                offset_top: 93,
                bottoming : false,
            })
            .on('sticky_kit:stick', function ()
            {
                $(this).parent().prev('li').find('h3').addClass('hidden');
            })
            .on('sticky_kit:unstick', function ()
            {
                $(this).parent().prev('li').find('h3').removeClass('hidden');
            })
        ;
    }

    getEventImages ( event: EventModel )
    {
        const now           = moment();
        const eventIsPassed = moment.unix(event.dates[ event.dates.length - 1 ].end).isBefore(now);

        // future
        if (!eventIsPassed)
        {
            return [ event.cover ];
        }
        // passed
        {
            return event.images;
        }
    }

    scrollTop ()
    {
        this.scrollService.scrollTop();
    }

    formatEventDate ( date: { start: number, end: number } ): string
    {
        const start = moment.unix(date.start);
        const end   = moment.unix(date.end);

        // one day
        if (end.diff(start, 'days') < 1)
        {
            return start.format('DD/MM/YYYY-HH[h]mm') + '>' + end.format('HH[h]mm');
        }
        // multiple days
        else
        {
            return start.format('DD/MM/YYYY') + '>' + end.format('DD/MM/YYYY');
        }
    }
}
