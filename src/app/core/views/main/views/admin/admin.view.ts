import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddAdminModalComponent } from './modals';
import { ConfirmDeleteModalComponent } from 'src/app/core/globals/modals';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.view.html',
    styleUrls: ['admin.view.scss']
})

export class AdminViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public adminDetails: [] = [];
    public loading = false;
    constructor(private _nzModalService: NzModalService) { }

    ngOnInit(): void { }

    public onClickOpenAddAdminModal(): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Add Admin',
            nzContent: AddAdminModalComponent,
            nzFooter: 'false',
        });
    }

    public onClickDeleteItem(): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Confirm Delete',
            nzContent: ConfirmDeleteModalComponent,
            nzFooter: 'false'
        });
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
