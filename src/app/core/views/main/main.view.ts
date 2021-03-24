import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-main',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss']
})

export class MainViewComponent implements OnInit, OnDestroy {
    public isCollapsed = false;
    public isAlternativeBackground: string;
    constructor(private _cookieService: CookieService) {
        this.isAlternativeBackground = '#' + this._cookieService.get('isAlternativeBackground');
        console.log(this.isAlternativeBackground);
    }

    ngOnInit(): void { }

    ngOnDestroy(): void { }
}
