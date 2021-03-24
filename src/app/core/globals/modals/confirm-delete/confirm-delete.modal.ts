import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: 'confirm-delete.modal.html',
    styleUrls: ['confirm-delete.modal.scss']
})

export class ConfirmDeleteModalComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
