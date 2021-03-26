import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from 'src/app/core/globals/modals';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { IUser } from 'src/app/core/moduls/user';
import { UserService } from './user.service';

@Component({
    selector: 'app-user',
    templateUrl: 'user.view.html',
    styleUrls: ['user.view.scss']
})

export class UserViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public page = 1;
    public countUser!: number;
    public searchControl: FormControl = new FormControl('');
    public userDetails: IUser[] = [];
    public loading = false;
    public errorMessage!: string;
    constructor(private _userService: UserService, private _nzModalService: NzModalService) { }

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe((data) => {
            if (data.length >= 3) {
                this._getUser(false);
            }
            else {
                this._getUser();
            }
        });
        this._getUser();
    }


    private _getUser(isShowLoading = true): void {
        if (isShowLoading) {
            this.loading = true;
        }
        const searchValue: string = this.searchControl.value;
        const page: number = this.page;
        this._userService.getUser(page, searchValue)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: PaginatorResponse<IUser[]>) => {
                this.countUser = data.count;
                this.userDetails = data.data;

            },
                err => {
                    this.errorMessage = err.message;
                }
            );
    }
    public onClickDeleteItem(item: IUser): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Confirm Delete',
            nzContent: ConfirmDeleteModalComponent,
            nzFooter: 'false'
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'confirm-delete') {
                this._onClickDeleteUserItem(item.id);
            }
        });
    }

    private _onClickDeleteUserItem(id: number): void {
        this._userService.deleteUserItem(id)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                })
            )
            .subscribe((data) => {
                this._getUser();
            },
                err => {
                    this.errorMessage = err.message;
                }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
