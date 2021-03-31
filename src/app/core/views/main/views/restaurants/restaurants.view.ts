import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { IResataurants } from 'src/app/core/moduls/restaurants';
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
    constructor(private _restaurantService: ReataurantService) { }

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
            console.log(this.restaurantsDetails);

        });

    }

    public onClickDeleteItem(item: IResataurants): void {}

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
