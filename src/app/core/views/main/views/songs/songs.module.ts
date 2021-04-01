import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { AddSongModalComponent, ViewVideoModalComponent } from './modals';
import { SongsRoutingModule } from './songs-routing.module';
import { SongsService } from './songs.service';
import { SongsViewComponent } from './songs.view';
import {DropdownModule} from 'primeng/dropdown';
import { YouTubePlayerModule } from '@angular/youtube-player';
@NgModule({
    declarations: [SongsViewComponent, AddSongModalComponent, ViewVideoModalComponent],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SongsRoutingModule,
        DropdownModule,
        YouTubePlayerModule
    ],
    providers: [SongsService],
    entryComponents: [AddSongModalComponent, ViewVideoModalComponent]
})

export class SongsModule { }
