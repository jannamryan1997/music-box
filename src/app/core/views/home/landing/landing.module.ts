import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared/shared.module';



import { LandingRoutingModule } from './landing-routing.module';

import { LandingService } from './landing.service';

import { LandingViewComponent } from './landing.view';



@NgModule({
    declarations: [LandingViewComponent],
    imports: [
        LandingRoutingModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [LandingService],
    entryComponents: []
})

export class LandingModule { }
