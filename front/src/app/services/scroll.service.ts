import { ElementRef, Injectable } from '@angular/core';

declare const $: any;

@Injectable({
    providedIn: 'root',
})
export class ScrollService
{

    constructor ()
    {
    }

    scrollToAbout ( animate = true )
    {
        let options = {
            offset: 16,
        } as any;
        if (animate)
        {
            options.duration = 500;
        }
        $('body').scrollTo('#aboutPreview', options);
    }

    scrollTop ()
    {
        $('body').scrollTo(0, { duration: 500 });
    }
}
