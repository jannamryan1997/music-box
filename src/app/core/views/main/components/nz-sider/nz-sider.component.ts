import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MENU_ITEM } from 'src/app/core/globals/menu-item';
import { IMenuItem } from 'src/app/core/moduls/menu-item';

@Component({
    selector: 'app-nz-sider',
    templateUrl: 'nz-sider.component.html',
    styleUrls: ['nz-sider.component.scss']
})

export class SiderComponent implements OnInit, OnDestroy {

    public menuItem: IMenuItem[] = MENU_ITEM;
    constructor(private _cookieService: CookieService) { }

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
