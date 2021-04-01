import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ConfirmDeleteModalComponent } from '../globals/modals';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingComponent, MatSpinnerComponent } from '../globals/components';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
    declarations: [ConfirmDeleteModalComponent, LoadingComponent, MatSpinnerComponent],
    imports: [
        NzIconModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzModalModule,
        NzFormModule,
        NzSpinModule,
        NzAlertModule,
        MatPaginatorModule
    ],
    providers: [],
    entryComponents: [ConfirmDeleteModalComponent],
    exports: [
        NzIconModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzModalModule,
        NzFormModule,
        NzSpinModule,
        NzAlertModule,
        ConfirmDeleteModalComponent,
        LoadingComponent,
        MatSpinnerComponent,
        MatPaginatorModule
    ]
})

export class SharedModule { }
