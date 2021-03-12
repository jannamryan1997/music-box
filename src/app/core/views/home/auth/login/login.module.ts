import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginViewComponent } from './login.view';

import { NzFormModule } from 'ng-zorro-antd/form';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { LoginService } from './login.service';

@NgModule({
    declarations: [LoginViewComponent],
    imports: [
        SharedModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        NzFormModule],
    providers: [LoginService],
    entryComponents: []
})

export class LoginModule { }
