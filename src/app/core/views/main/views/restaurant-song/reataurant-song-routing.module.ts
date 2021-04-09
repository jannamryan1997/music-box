import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantSongViewComponent } from './restaurnt-song.view';

const restaurantSongRoutes: Routes = [
    { path: '', component: RestaurantSongViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(restaurantSongRoutes)],
    exports: [RouterModule]
})
export class RestaurantSongRoutingModule { }
