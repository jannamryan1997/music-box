import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminViewComponent } from './admin.view';

const adminRoutes: Routes = [{ path: '', component: AdminViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule],
})

export class AdminRoutingModule { }
