import { HttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { DatasModel } from './models/datas.model';
import { RandomImageComponent } from './random-image/random-image.component';
import { DatasProviderService } from './services/datas-provider.service';

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
