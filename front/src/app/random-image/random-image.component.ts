import { Component, Input, OnInit } from '@angular/core';
import { ImageModel } from '../models/image.model';

@Component({
    selector   : 'app-random-image',
    templateUrl: './random-image.component.html',
    styleUrls  : [ './random-image.component.css' ],
})
export class RandomImageComponent implements OnInit
{
    @Input() set images ( images: ImageModel[] )
    {
        if (images.length === 0)
        {
            this.image = null;
        }
        this.image = images[ Math.floor(Math.random() * images.length) ];
    }

    image: ImageModel;

    constructor ()
    {
    }

    ngOnInit ()
    {
    }
}
