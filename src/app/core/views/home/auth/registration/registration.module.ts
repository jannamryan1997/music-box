import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationViewComponent } from './registration.view';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { RegistrationService } from './registration.service';

@NgModule({
    declarations: [RegistrationViewComponent],
    imports: [
        SharedModule,
        RegistrationRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NzFormModule,
        NzImageModule,
        NzSpaceModule
    ],
    providers: [RegistrationService],
    entryComponents: []
})

export class RegistrationModule { }
