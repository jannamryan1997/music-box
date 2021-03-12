import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingViewComponent } from './landing.view';

const landingRoutes: Routes = [{ path: '', component: LandingViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(landingRoutes)],
    exports: [RouterModule]
})
export class LandingRoutingModule { }
