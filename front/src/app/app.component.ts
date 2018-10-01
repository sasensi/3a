import { Component } from '@angular/core';
import { DatasModel } from './models/datas.model';
import { DatasProviderService } from './services/datas-provider.service';
import { ScrollService } from './services/scroll.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : [ './app.component.scss' ],
})
export class AppComponent
{
    datas: DatasModel;
    userEntered = false;

    constructor ( private datasProviderService: DatasProviderService,
                  private scrollService: ScrollService )
    {
        this.datasProviderService.getDatas().subscribe(datas => this.datas = datas);
    }

    onImageClicked ()
    {
        this.userEntered = true;
    }

    onTitleClicked ()
    {
        if (this.userEntered)
        {
            this.scrollService.scrollToAbout();
        }
        else
        {
            this.userEntered = true;
        }
    }
}
