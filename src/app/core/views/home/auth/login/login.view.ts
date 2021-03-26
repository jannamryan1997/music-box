import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IAuthorization } from 'src/app/core/moduls/authorization';
import { ILogin } from 'src/app/core/moduls/login';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.view.html',
    styleUrls: ['login.view.scss']
})

export class LoginViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public validateForm!: FormGroup;
    public loading = false;
    public errorMessage!: string;

    constructor(
        private _fb: FormBuilder,
        private _loginService: LoginService,
        private _cookieService: CookieService,
        private _router: Router
        ) { }

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            userName: ['admin@music-box.org', [Validators.required]],
            password: ['admin', [Validators.required]],
        });
    }

    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickLogin(): void {
        if (this.validateForm.invalid) {
            this.validateForm.markAllAsTouched();
            return;
        }
        this.loading = true;
        const loginDetails: ILogin = {
            login: this.validateForm.value.userName,
            password: this.validateForm.value.password,
        };
        this._loginService.login(loginDetails)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data: IAuthorization) => {
                this._cookieService.set('accessToken', data.accessToken);
                this._cookieService.set('refreshToken', data.refreshToken);
                this._router.navigate(['/admins']);

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
