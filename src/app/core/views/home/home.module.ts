import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './home.views';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [SharedModule,
        HomeRoutingModule,
        NzLayoutModule,
        NzButtonModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        ClickOutsideModule
    ],
    providers: [],
    entryComponents: []
})

export class HomeModule { }
