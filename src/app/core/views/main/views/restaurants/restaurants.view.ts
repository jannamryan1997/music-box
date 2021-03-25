import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-restaurats',
    templateUrl: 'restaurants.view.html',
    styleUrls: ['restaurants.view.scss']
})

export class RestaurantsViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
