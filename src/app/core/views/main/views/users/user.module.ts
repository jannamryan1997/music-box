import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user.view';

@NgModule({
    declarations: [UserViewComponent],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        UserRoutingModule
    ],
    providers: [],
    entryComponents: []
})

export class UserModule { }
