import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: 'user.view.html',
    styleUrls: ['user.view.scss']
})

export class UserViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();


    ngOnInit(): void { }
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
