import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundViewComponent } from './not-found.view';
import { NzResultModule } from 'ng-zorro-antd/result';

@NgModule({
    declarations: [NotFoundViewComponent],
    imports: [NotFoundRoutingModule, NzResultModule, NzButtonModule],
    providers: [],
    entryComponents: []
})

export class NotFoundModule { }
