import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DatasModel } from '../../models/datas.model';
import { EventModel } from '../../models/event.model';
import * as moment from 'moment';
import { ScrollService } from '../../services/scroll.service';

@Component({
    selector   : 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls  : [ './main-page.component.css' ],
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
        this.scrollService.scrollToElement(this.aboutPreview.nativeElement);
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
}
