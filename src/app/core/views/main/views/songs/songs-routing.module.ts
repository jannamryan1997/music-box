import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongsViewComponent } from './songs.view';

const songsRoutes: Routes = [{ path: '', component: SongsViewComponent }];

@NgModule({
    imports: [RouterModule.forChild(songsRoutes)],
    exports: [RouterModule]
})

export class SongsRoutingModule { }
