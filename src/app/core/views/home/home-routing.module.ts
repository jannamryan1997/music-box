import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './home.views';

const homeRoutes: Routes = [{
    path: '', component: HomeViewComponent,
    children: [
        { path: '', pathMatch: 'full', redirectTo: 'landing' },
        {
            path: 'landing',
            loadChildren: () => import('./landing/landing.module')
                .then(m => m.LandingModule)
        },
        {
            path: 'login',
            loadChildren: () => import('./auth/login/login.module')
                .then(m => m.LoginModule),
        },
        {
            path: 'registration',
            loadChildren: () => import('./auth/registration/registration.module')
                .then(m => m.RegistrationModule)
        }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
