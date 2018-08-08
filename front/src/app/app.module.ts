import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Nl2BrPipeModule } from 'nl2br-pipe';

import { AppComponent } from './app.component';
import { RandomImageComponent } from './random-image/random-image.component';
import { DatasProviderService } from './services/datas-provider.service';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
    declarations: [
        AppComponent,
        RandomImageComponent,
        MainPageComponent,
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        Nl2BrPipeModule,
    ],
    providers   : [ DatasProviderService ],
    bootstrap   : [ AppComponent ],
})
export class AppModule
{
}
