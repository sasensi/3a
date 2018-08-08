import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DatasModel } from '../../models/datas.model';
import { EventModel } from '../../models/event.model';
import * as moment from 'moment';
import { ScrollService } from '../../services/scroll.service';

@Component({
    selector   : 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls  : [ './main-page.component.scss' ],
})
export class MainPageComponent implements OnInit, AfterViewInit
{
    @Input() datas: DatasModel;

    @ViewChild('aboutPreview') aboutPreview: ElementRef;

    constructor ( private scrollService: ScrollService )
    {
    }

    ngOnInit ()
    {
    }

    ngAfterViewInit ()
    {
        this.scrollService.scrollToAbout();
    }

    getEventImages ( event: EventModel )
    {
        const now           = moment();
        const eventIsPassed = moment.unix(event.end).isBefore(now);

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

    eventLastLessThanOneDay ( event: EventModel ): boolean
    {
        const durationInDays = moment.unix(event.end).diff(moment.unix(event.start), 'days');
        return durationInDays < 1;
    }

    formatOneDayEventDate ( event: EventModel ): string
    {
        return moment.unix(event.start).format('DD/MM/YYYY-HH:mm') + '>' + moment.unix(event.end).format('HH:mm');
    }

    formatEventDate ( event: EventModel ): string
    {
        const start = moment.unix(event.start);
        const end   = moment.unix(event.end);

        // one day
        if (end.diff(start, 'days') < 1)
        {
            return start.format('DD/MM/YYYY-HH:mm') + '>' + end.format('HH:mm');
        }
        // multiple days
        else
        {
            return start.format('DD/MM/YYYY') + '>' + end.format('DD/MM/YYYY');
        }
    }
}
