import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: 'confirm-delete.modal.html',
    styleUrls: ['confirm-delete.modal.scss']
})

export class ConfirmDeleteModalComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();

    constructor(private _nzModal: NzModalRef) { }

    ngOnInit(): void { }

    public onClickConfirmDelete(): void {
        this._nzModal.destroy('confirm-delete');
    }
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
