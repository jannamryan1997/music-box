import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IAdmin } from 'src/app/core/moduls/admin';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-add-admin',
    templateUrl: 'add-admin.modal.html',
    styleUrls: ['add-admin.modal.scss']
})

export class AddAdminModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    public errorMessage!: string;

    public validateForm!: FormGroup;

    constructor(private _fb: FormBuilder, private _adminService: AdminService, private _nzdal: NzModalRef) { }

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            login: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickAddAdmin(): void {
        this.loading = true;
        this.validateForm.disable();
        const { login, password } = this.validateForm.value;
        const adminDetails: IAdmin = {
            login,
            password,
        };
        this._adminService.addAdmin(adminDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                    this.validateForm.enable();
                })
            )
            .subscribe((data) => {
                console.log(data);
                if (data) {
                    this._nzdal.destroy('addAdmin');
                }
            },
                err => {
                    console.log(err);
                    
                    this.errorMessage = err.message;
                }
            );
    }
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
