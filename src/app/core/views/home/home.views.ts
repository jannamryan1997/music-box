import { Component, OnDestroy, OnInit } from '@angular/core';
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
    constructor(private _isAlternativeService: IsAlternativeService) { }

    ngOnInit(): void { }

    public onClickIsAlternative(): void {
        this.isAlternative = !this.isAlternative;
        this._isAlternativeService.sentisAlternative(this.isAlternative);
        console.log(this.isAlternative);
    }

    public onClickShowManu(): void {
        this.show = !this.show;
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
