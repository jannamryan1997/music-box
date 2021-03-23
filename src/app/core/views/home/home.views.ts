import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { IsAlternativeService } from '../../services/isAlternative.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.view.html',
    styleUrls: ['home.view.scss']
})

export class HomeViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public isAlternative = false;
    public show = false;
    public isAlternativeBackground!: string;
    constructor(
        private _isAlternativeService: IsAlternativeService,
        private _cookieService: CookieService) {
        if (!this._cookieService.get('isAlternativeBackground')) {
            this._cookieService.set('isAlternativeBackground', '070b10');
        }
        this.isAlternativeBackground = '#' + this._cookieService.get('isAlternativeBackground');
        if (this.isAlternativeBackground === '#0000') {
            this.isAlternative = true;
            this._isAlternativeService.sentisAlternative(true);
        }
        else {
            this.isAlternative = false;
            this._isAlternativeService.sentisAlternative(false);
        }
    }

    ngOnInit(): void { }

    public onClickIsAlternative(): void {
        this.isAlternative = !this.isAlternative;
        if (this.isAlternative === true) {
            this._cookieService.set('isAlternativeBackground', '0000');
            this.isAlternativeBackground = '#' + this._cookieService.get('isAlternativeBackground');
        }
        else {
            this._cookieService.set('isAlternativeBackground', '070b10');
            this.isAlternativeBackground = '#' + this._cookieService.get('isAlternativeBackground');
        }
        if (this.isAlternativeBackground === '#0000') {
            this._isAlternativeService.sentisAlternative(true);
        }
        else{
            this._isAlternativeService.sentisAlternative(false);
        }

    }

    public onClickShowManu(): void {
        this.show = !this.show;
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
