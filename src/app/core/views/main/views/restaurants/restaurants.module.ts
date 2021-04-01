import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RestaursntsRoutingModule } from './restaurants-routing.module';
import { ReataurantService } from './restaurants.service';
import { RestaurantsViewComponent } from './restaurants.view';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CreateResataurantModalComponent } from './modals';


@NgModule({
    declarations: [RestaurantsViewComponent, CreateResataurantModalComponent],
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RestaursntsRoutingModule,
        NzCheckboxModule
    ],
    providers: [ReataurantService],
    entryComponents: [CreateResataurantModalComponent]
})

export class ResataurantsModule { }
