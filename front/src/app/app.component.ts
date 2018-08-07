import { Component } from '@angular/core';
import { DatasModel } from './models/datas.model';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : [ './app.component.css' ],
})
export class AppComponent
{
    datas: DatasModel = {
        images: [],
        events: [],
        about : '',
    };
}
