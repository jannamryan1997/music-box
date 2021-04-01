import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MENU_ITEM } from '../../globals/menu-item';
import { IMenuItem } from '../../moduls/menu-item';

@Component({
    selector: 'app-main',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss']
})

export class MainViewComponent implements OnInit, OnDestroy {
    public isCollapsed = false;
    public isCollapsedMobile = false;
    public isAlternativeBackground: string;
    public menuItem: IMenuItem[] =  MENU_ITEM;
    constructor(private _cookieService: CookieService) {
        this.isAlternativeBackground = '#' + this._cookieService.get('isAlternativeBackground');
    }

    ngOnInit(): void { }

    public logOut(item: IMenuItem): boolean {
        if (item.label === 'Log out') {
            this._cookieService.delete('refreshToken');
            this._cookieService.delete('accessToken');
            return true;
        }
        else {
            return false;
        }
    }

    ngOnDestroy(): void { }
}
