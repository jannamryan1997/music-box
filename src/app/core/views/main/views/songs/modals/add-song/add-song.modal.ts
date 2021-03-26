import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-add-song',
    templateUrl: 'add-song.modal.html',
    styleUrls: ['add-song.modal.scss']
})

export class AddSongModalComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public validateForm!: FormGroup;
    public loading = false;
    public errorMessage!: string;

    constructor(private _fb: FormBuilder) { }

    ngOnInit(): void {
        this._initForm();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            url: ['', Validators.required],
            startSecond: ['', Validators.required],
            endSecond: ['', Validators.required]
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
