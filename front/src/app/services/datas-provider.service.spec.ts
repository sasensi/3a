import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { DatasProviderService } from './datas-provider.service';

describe('DatasProviderService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            imports  : [ HttpClientModule ],
            providers: [ DatasProviderService ],
        });
    });

    it('should be created', inject([ DatasProviderService ], ( service: DatasProviderService ) =>
    {
        expect(service).toBeTruthy();
    }));

    it('should use HTTP client to get datas and return them as is', inject([
        DatasProviderService,
        HttpClient,
    ], async ( service: DatasProviderService, httpClient ) =>
    {
        const expectedDatas = 'test data';
        spyOn(httpClient, 'get').and.returnValue(expectedDatas);
        const actualDatas = service.getDatas();
        expect(httpClient.get).toHaveBeenCalledWith('/api/datas.php');
        expect(actualDatas).toEqual(expectedDatas as any);
    }));
});
