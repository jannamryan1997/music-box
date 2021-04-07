import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { MENU_ITEM } from '../../globals/menu-item';
import { EUserRole } from '../../moduls/auth-user';
import { IMenuItem } from '../../moduls/menu-item';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-main',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss']
})

export class MainViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    public isCollapsed = false;
    public isCollapsedMobile = false;
    public isAlternativeBackground: string;
    public menuItem: IMenuItem[] = MENU_ITEM;
    public role!: EUserRole;
    constructor(private _cookieService: CookieService, private _userService: UserService) {
        this.isAlternativeBackground = '#' + this._cookieService.get('isAlternativeBackground');
        this.role = this._userService.getUserSync()?.role;
        this.menuItem = this.menuItem.filter((v) => v.roles.includes(this.role));
        this._cookieService.set('role', this.role);
    }

    ngOnInit(): void {}



    public logOut(item: IMenuItem): boolean {
        if (item.label === 'Log out') {
            this._cookieService.delete('refreshToken');
            this._cookieService.delete('accessToken');
            this._cookieService.delete('role');
            return true;
        }
        else {
            return false;
        }
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
     }
}
