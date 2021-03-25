import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RestaursntsRoutingModule } from './restaurants-routing.module';
import { RestaurantsViewComponent } from './restaurants.view';

@NgModule({
    declarations: [RestaurantsViewComponent],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RestaursntsRoutingModule
    ],
    providers: [],
    entryComponents: []
})

export class ResataurantsModule { }
