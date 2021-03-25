import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsViewComponent } from './restaurants.view';

const restaurantsRoutes: Routes = [{ path: '', component: RestaurantsViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(restaurantsRoutes)],
    exports: [RouterModule]
})

export class RestaursntsRoutingModule { }
