import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminService } from './admin.service';
import { AdminViewComponent } from './admin.view';
import { AddAdminModalComponent } from './modals';

@NgModule({
    declarations: [AdminViewComponent, AddAdminModalComponent],
    imports: [
        SharedModule,
        AdminRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [AdminService],
    entryComponents: [AddAdminModalComponent]
})

export class AdminModule { }
