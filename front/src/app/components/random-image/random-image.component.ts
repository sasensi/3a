import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModel } from '../../models/image.model';

@Component({
    selector   : 'app-random-image',
    templateUrl: './random-image.component.html',
    styleUrls  : [ './random-image.component.scss' ],
})
export class RandomImageComponent implements OnInit
{
    @Input() set images ( images: ImageModel[] )
    {
        if (!images || images.length === 0)
        {
            this.image = null;
            return;
        }
        this.image = images[ Math.floor(Math.random() * images.length) ];
    }

    @Output() imageClicked = new EventEmitter();

    image: ImageModel;

    constructor ()
    {
    }

    ngOnInit ()
    {
    }
}
