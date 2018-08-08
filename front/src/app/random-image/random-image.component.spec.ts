import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import datasMock from '../models/datas.mock';
import { ImageModel } from '../models/image.model';

import { RandomImageComponent } from './random-image.component';

describe('RandomImageComponent', () =>
{
    const images: ImageModel[] = datasMock.images;

    let component: RandomImageComponent;
    let fixture: ComponentFixture<RandomImageComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
                   declarations: [ RandomImageComponent ],
               })
               .compileComponents();
    }));

    beforeEach(() =>
    {
        [ fixture, component ] = createComponent();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });

    it('should display image from input array', async () =>
    {
        const displayedImage = getDisplayedImage(fixture);

        expect(images.find(image => image.url === displayedImage.url && image.legend === displayedImage.legend))
            .not.toBeUndefined();
    });

    it('should display random image from input array', async () =>
    {
        // there is a chance that consecutive images will be the same
        // try a reasonable amount of times to reduce this probability
        const maxRetries     = images.length * 2;
        const displayedImage = getDisplayedImage(fixture);
        const retriesCounter = 0;
        let otherDisplayedImage;

        while (retriesCounter < maxRetries)
        {
            // create another component with same input
            const [ otherFixture, otherComponent ] = createComponent();
            otherDisplayedImage                    = getDisplayedImage(otherFixture);

            if (JSON.stringify(otherDisplayedImage) !== JSON.stringify(displayedImage))
            {
                break;
            }
        }

        expect(otherDisplayedImage).not.toBeUndefined();
        expect(otherDisplayedImage).not.toEqual(displayedImage);
    });


    //
    // UTILS
    //

    function createComponent (): [ ComponentFixture<RandomImageComponent>, RandomImageComponent ]
    {
        let fixture      = TestBed.createComponent(RandomImageComponent);
        let component    = fixture.componentInstance;
        component.images = images;
        fixture.detectChanges();

        return [ fixture, component ];
    }

    function getDisplayedImage ( fixture: ComponentFixture<RandomImageComponent> ): ImageModel
    {
        return {
            url   : fixture.debugElement.nativeElement.querySelector('img').src,
            legend: fixture.debugElement.nativeElement.querySelector('legend').textContent,
        };
    }
});
