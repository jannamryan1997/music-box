import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { SongsRoutingModule } from './songs-routing.module';
import { SongsService } from './songs.service';
import { SongsViewComponent } from './songs.view';

@NgModule({
    declarations: [SongsViewComponent],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SongsRoutingModule
    ],
    providers: [SongsService],
    entryComponents: []
})

export class SongsModule { }