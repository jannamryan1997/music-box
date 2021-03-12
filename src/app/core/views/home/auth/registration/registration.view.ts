import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { pipe, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IRegistration } from 'src/app/core/moduls/registration';
import { RegistrationService } from './registration.service';

@Component({
    selector: 'app-registration',
    templateUrl: 'registration.view.html',
    styleUrls: ['registration.view.scss']
})

export class RegistrationViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public validateForm!: FormGroup;
    public loading = false;
    public errorMessage!: string;
    constructor(
        private _fb: FormBuilder,
        private _registrationService: RegistrationService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            username: ['janna', [Validators.required]],
            email: ['janna.mryan1997@mail.ru', [Validators.required, Validators.email]],
            phone: ['+37494598259', Validators.required],
            password: ['fdsa1234', [Validators.required]],
        });
    }

    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickRegistration(): void {
        if (this.validateForm.invalid) {
            this.validateForm.markAllAsTouched();
            return;
        }
        this.loading = true;
        const registrationDetails: IRegistration = {
            login: this.validateForm.value.username,
            password: this.validateForm.value.password,
        };
        this._registrationService.registration(registrationDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data) => {
                console.log(data);

            },
                err => {
                    this.errorMessage = err.errorMessage;
                }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
