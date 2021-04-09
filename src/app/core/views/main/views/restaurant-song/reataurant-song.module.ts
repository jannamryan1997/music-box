import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantSongRoutingModule } from './reataurant-song-routing.module';
import { RestaurantSongService } from './restaurant-song.service';
import { RestaurantSongViewComponent } from './restaurnt-song.view';
import { YouTubePlayerModule } from '@angular/youtube-player';
@NgModule({
    declarations: [RestaurantSongViewComponent],
    imports: [RestaurantSongRoutingModule,
        CommonModule, ReactiveFormsModule,
        FormsModule,
        YouTubePlayerModule],
    providers: [RestaurantSongService],
    entryComponents: []
})

export class RestaurantSongModule { }
