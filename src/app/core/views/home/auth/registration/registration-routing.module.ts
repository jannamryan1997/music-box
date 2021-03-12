import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationViewComponent } from './registration.view';


const registrationRoutes: Routes = [{ path: '', component: RegistrationViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(registrationRoutes)],
    exports: [RouterModule]
})

export class RegistrationRoutingModule { }
