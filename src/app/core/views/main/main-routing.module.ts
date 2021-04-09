import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from '../../guards/role.guard';
import { EUserRole } from '../../moduls/auth-user';
import { MainViewComponent } from './main.view';

const mainRoutes: Routes = [{
    path: '', component: MainViewComponent,
    children:
        [
            {
                path: 'admins',
                loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule),
                data: {
                    enabledRoles: [EUserRole.Admin, EUserRole.SuperAdmin]
                },
                canActivate: [RoleGuard]
            },
            {
                path: 'users',
                loadChildren: () => import('./views/users/user.module').then(m => m.UserModule),
                data: {
                    enabledRoles: [EUserRole.Admin, EUserRole.SuperAdmin]
                },
                canActivate: [RoleGuard]
            },
            {
                path: 'restaurants',
                loadChildren: () => import('./views/restaurants/restaurants.module').then(m => m.ResataurantsModule),
                data: {
                    enabledRoles: [EUserRole.Admin, EUserRole.SuperAdmin]
                },
                canActivate: [RoleGuard]
            },
            {
                path: 'songs',
                loadChildren: () => import('./views/songs/songs.module').then(m => m.SongsModule),
                data: {
                    enabledRoles: [EUserRole.Admin, EUserRole.SuperAdmin, EUserRole.Restaurant]
                },
                canActivate: [RoleGuard]
            },
            {
                path: 'restaurantSong',
                loadChildren: () => import('./views/restaurant-song/reataurant-song.module').
                then(m => m.RestaurantSongModule),
                data: {
                    enabledRoles: [EUserRole.Restaurant]
                },
                canActivate: [RoleGuard]

            }
        ]
}];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})

export class MainRoutingModule { }
