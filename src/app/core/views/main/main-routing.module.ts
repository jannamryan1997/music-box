import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main.view';

const mainRoutes: Routes = [{
    path: '', component: MainViewComponent,
    children:
        [
            {
                path: 'admins',
                loadChildren: () => import('./views/admin/admin.module').then(m => m.AdminModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./views/users/user.module').then(m => m.UserModule)
            }
        ]
}];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})

export class MainRoutingModule { }
