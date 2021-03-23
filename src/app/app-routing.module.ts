import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  {
    path: '',
    loadChildren: () => import('./core/views/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./core/views/main/main.module').then(m => m.MainModule),
  },
{
    path: 'not-found',
    loadChildren: () => import('./core/views/not-found/not-found.module').then(m => m.NotFoundModule)
  },
  {
    path: '**',
    loadChildren: () => import('./core/views/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
