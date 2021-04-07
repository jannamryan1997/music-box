import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from 'src/app/core/globals/modals';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { IResataurants } from 'src/app/core/moduls/restaurants';
import { UserService } from 'src/app/core/services/user.service';
import { CreateResataurantModalComponent } from './modals';
import { ReataurantService } from './restaurants.service';

@Component({
    selector: 'app-restaurats',
    templateUrl: 'restaurants.view.html',
    styleUrls: ['restaurants.view.scss']
})

export class RestaurantsViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public searchControl: FormControl = new FormControl('');
    public loading = false;
    public restaurantsDetails: IResataurants[] = [];
    public page = 1;
    public countRestaurnat!: number;
    public errorMessage!: string;
    constructor(
        private _restaurantService: ReataurantService,
        private _nzModalService: NzModalService,
        private _userService: UserService,
        ) { }

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe((data) => {
            if (data.length >= 3) {
                this._getRestaurants(false);
            }
            else {
                this._getRestaurants();
            }
        });
        this._getRestaurants();
    }
    
    private _getRestaurants(isShowloading = true): void {
        if (isShowloading) {
            this.loading = true;
        }
        const searchValue: string = this.searchControl.value;
        const page: number = this.page;
        this._restaurantService.getRestaurant(page, searchValue)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: PaginatorResponse<IResataurants[]>) => {
                this.countRestaurnat = data.count;
                this.restaurantsDetails = data.data;

            });

    }

    public onClickOpenRestaurantModal(item: IResataurants): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Create Restaurant',
            nzContent: CreateResataurantModalComponent,
            nzFooter: 'false',
            nzComponentParams: { item }
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'create restaurant') {
                this._getRestaurants();
            }
        });
    }

    private _deleteAdminItem(id: number): void {
        this._restaurantService.deleteRestaurant(id)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => { })
            )
            .subscribe((data) => {
            },
                err => {
                    this.errorMessage = err.message;
                }
            );
    }

    public onClickDeleteItem(item: IResataurants): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Confirm Delete',
            nzContent: ConfirmDeleteModalComponent,
            nzFooter: 'false'
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'confirm-delete') {
                this._deleteAdminItem(item.id);
            }
        });
    }
    public paginate($event: PageEvent): void {
        this.page = $event.pageIndex + 1;
        this._getRestaurants();
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
