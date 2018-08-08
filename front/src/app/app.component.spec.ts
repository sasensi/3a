import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import datasMock from './models/datas.mock';
import { DatasModel } from './models/datas.model';
import { RandomImageComponent } from './random-image/random-image.component';
import { DatasProviderService } from './services/datas-provider.service';
import { ScrollService } from './services/scroll.service';

class DatasProviderServiceMock
{
    getDatas (): Observable<DatasModel>
    {
        return of({
            events: [],
            images: [],
            about : '',
        });
    }
}

describe('AppComponent', () =>
{
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
            ],
            providers   : [ { provide: DatasProviderService, useClass: DatasProviderServiceMock } ],
            schemas     : [ NO_ERRORS_SCHEMA ],
        }).compileComponents();
    }));
    beforeEach(() =>
    {
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
    });

    it('should create the app', async(() =>
    {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it('should render 3A in separated h1 tags', async(() =>
    {
        const compiled = fixture.debugElement.nativeElement;
        const titles   = Array.from(compiled.querySelectorAll('h1')).map(( el: any ) => el.textContent);
        expect(titles).toEqual([ '3', 'A' ]);
    }));

    it('should scroll to about preview when 3 or A is clicked', () =>
    {
        const scrollService = TestBed.get(ScrollService) as ScrollService;
        const titleNodes    = fixture.debugElement.queryAll(By.css('h1'));
        spyOn(scrollService, 'scrollToAbout');

        titleNodes.forEach(titleNode =>
        {
            titleNode.triggerEventHandler('click', null);
        });

        expect(scrollService.scrollToAbout).toHaveBeenCalledTimes(titleNodes.length);
    });
});