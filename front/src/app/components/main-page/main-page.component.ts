import { Component, Input, OnInit } from '@angular/core';
import { DatasModel } from '../../models/datas.model';
import { EventModel } from '../../models/event.model';
import * as moment from 'moment';

@Component({
    selector   : 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls  : [ './main-page.component.css' ],
})
export class MainPageComponent implements OnInit
{
    @Input() datas: DatasModel;

    constructor ()
    {
    }

    ngOnInit ()
    {
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
