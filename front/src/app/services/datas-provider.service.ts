import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatasModel } from '../models/datas.model';

@Injectable({
    providedIn: 'root',
})
export class DatasProviderService
{

    constructor ( private httpClient: HttpClient )
    {
    }

    getDatas (): Observable<DatasModel>
    {
        return this.httpClient.get('/api/datas.php') as any;
    }
}
