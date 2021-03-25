import { Component, OnDestroy, OnInit } from '@angular/core';
import { MENU_ITEM } from 'src/app/core/globals/menu-item';
import { IMenuItem } from 'src/app/core/moduls/menu-item';

@Component({
    selector: 'app-nz-sider',
    templateUrl: 'nz-sider.component.html',
    styleUrls: ['nz-sider.component.scss']
})

export class SiderComponent implements OnInit, OnDestroy {

    public menuItem: IMenuItem[] = MENU_ITEM;
    constructor() { }

    ngOnInit(): void {}

    ngOnDestroy(): void { }
}
