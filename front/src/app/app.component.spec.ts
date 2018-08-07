import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RandomImageComponent } from './random-image/random-image.component';

describe('AppComponent', () =>
{
    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                RandomImageComponent,
            ],
        }).compileComponents();
    }));
    it('should create the app', async(() =>
    {
        const fixture = TestBed.createComponent(AppComponent);
        const app     = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should render 3A in separated h1 tags', async(() =>
    {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const titles   = Array.from(compiled.querySelectorAll('h1')).map(( el: any ) => el.textContent);
        expect(titles).toEqual([ '3', 'A' ]);
    }));
});
