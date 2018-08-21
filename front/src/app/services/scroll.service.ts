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
        let options = { axis: 'y' } as any;
        if (animate)
        {
            options.duration = 500;
        }
        $('body').scrollTo('#aboutPreview', options);
    }

    scrollTop ()
    {
        $('body').scrollTo(0, { axis: 'y', duration: 500 });
    }

    scrollIsAboveAbout (): boolean
    {
        const aboutPreviewScrollTop = $('#aboutPreview').offset().top;
        const currentScroll         = $(window).scrollTop();

        console.log('about', aboutPreviewScrollTop, 'window', currentScroll, currentScroll < aboutPreviewScrollTop);

        return currentScroll < aboutPreviewScrollTop;
    }
}
