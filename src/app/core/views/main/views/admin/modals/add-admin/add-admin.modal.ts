import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-add-admin',
    templateUrl: 'add-admin.modal.html',
    styleUrls: ['add-admin.modal.scss']
})

export class AddAdminModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();

    public validateForm!: FormGroup;

    constructor(private _fb: FormBuilder) { }

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }
    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }
    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
