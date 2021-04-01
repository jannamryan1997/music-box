import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IResataurants } from 'src/app/core/moduls/restaurants';
import { ReataurantService } from '../../restaurants.service';

@Component({
    selector: 'app-create-restaurant-modal',
    templateUrl: 'create-restaurant.modal.html',
    styleUrls: ['create-restaurant.modal.scss']
})

export class CreateResataurantModalComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    @Input() item!: IResataurants;
    public validateForm!: FormGroup;
    public errorMessage!: string;
    public loading = false;
    public disableInput = true;
    constructor(private _reataurantService: ReataurantService, private _fb: FormBuilder, private _NzModalRef:NzModalRef) { }

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            address: ['', Validators.required],
            name: ['', Validators.required],
            phone_number: ['', Validators.required],
            isAdmin_verified: [],
        });
        this._setPatchValue();
    }

    private _setPatchValue(): void {
        this.validateForm.patchValue({
            address: this.item.address,
            name: this.item.name,
            phone_number: this.item.phoneNumber,
            isAdmin_verified: this.item.isAdminVerified,
        });
    }

    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickCreateRestaurnat(): void {
        this.loading = true;
        this._reataurantService.resrtaratCreate(this.item?.id, this.validateForm.value.isAdmin_verified)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._NzModalRef.close('create restaurant');

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
