import { NgModule } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ConfirmDeleteModalComponent } from '../globals/modals';

@NgModule({
    declarations: [ConfirmDeleteModalComponent],
    imports: [
        NzIconModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzModalModule,
        NzFormModule],
    providers: [],
    entryComponents: [ConfirmDeleteModalComponent],
    exports: [
        NzIconModule,
        NzInputModule,
        NzButtonModule,
        NzTableModule,
        NzModalModule,
        NzFormModule,
        ConfirmDeleteModalComponent
    ]
})

export class SharedModule { }
