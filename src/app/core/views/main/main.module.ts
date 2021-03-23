import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainViewComponent } from './main.view';
import { SharedModule } from '../../shared/shared.module';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SiderComponent } from './components';


@NgModule({
    declarations: [MainViewComponent, SiderComponent],
    imports: [SharedModule,
        MainRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NzLayoutModule,
        NzBreadCrumbModule,
        NzInputModule],
    providers: [],
    entryComponents: []
})

export class MainModule { }
