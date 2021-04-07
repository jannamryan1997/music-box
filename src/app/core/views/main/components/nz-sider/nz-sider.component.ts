import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MENU_ITEM } from 'src/app/core/globals/menu-item';
import { EUserRole } from 'src/app/core/moduls/auth-user';
import { IMenuItem } from 'src/app/core/moduls/menu-item';
import { UserService } from 'src/app/core/services/user.service';

@Component({
    selector: 'app-nz-sider',
    templateUrl: 'nz-sider.component.html',
    styleUrls: ['nz-sider.component.scss']
})

export class SiderComponent implements OnInit, OnDestroy {

    public menuItem: IMenuItem[] = MENU_ITEM;
    public role!: EUserRole;
    constructor(private _cookieService: CookieService, private _userService: UserService) {
        this.role = this._userService.getUserSync()?.role;
        this.menuItem = this.menuItem.filter((v) => v.roles.includes(this.role));
        this._cookieService.set('role', this.role);
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
