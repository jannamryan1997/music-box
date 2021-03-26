import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AddAdminModalComponent } from './modals';
import { ConfirmDeleteModalComponent } from 'src/app/core/globals/modals';
import { AdminService } from './admin.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { IAdminDedatils } from 'src/app/core/moduls/admin';

@Component({
    selector: 'app-admin',
    templateUrl: 'admin.view.html',
    styleUrls: ['admin.view.scss']
})

export class AdminViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    public page = 1;
    public countAdmins!: number;
    public searchControl: FormControl = new FormControl('');
    public adminDetails: IAdminDedatils[] = [];
    public messageError!: string;
    constructor(
        private _nzModalService: NzModalService,
        private _adminService: AdminService) { }

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe((data) => {
            if (data.length >= 3) {
                this._getAdmins(false);
            }
            else {
                this._getAdmins();
            }
        });
        this._getAdmins();
    }


    private _getAdmins(isShowLoading = true): void {
        if (isShowLoading) {
            this.loading = true;
        }
        const searchValue: string = this.searchControl.value;
        const page: number = this.page;
        this._adminService.getAdmins(page, searchValue).
            pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: PaginatorResponse<IAdminDedatils[]>) => {
                    this.countAdmins = data.count;
                    this.adminDetails = data.data;

            });
    }

    public onClickOpenAddAdminModal(): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Add Admin',
            nzContent: AddAdminModalComponent,
            nzFooter: 'false',
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'addAdmin') {
                this._getAdmins();
            }
        });
    }

    public onClickDeleteItem(adminData: IAdminDedatils): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Confirm Delete',
            nzContent: ConfirmDeleteModalComponent,
            nzFooter: 'false'
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'confirm-delete') {
                this._deleteAdminItem(adminData.id);
            }
        });
    }

    private _deleteAdminItem(id: number): void {
        this._adminService.deleteAdmin(id)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {

                })
            )
            .subscribe((data) => {
                this._getAdmins();
            },
                err => {
                    this.messageError = err.message;
                }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
