import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { IRegistrationRestaurant } from 'src/app/core/moduls/registration';
import { UploadFileResponse } from 'src/app/core/moduls/upload-file';
import { RegistrationService } from './registration.service';

declare const google: any;
@Component({
    selector: 'app-registration',
    templateUrl: 'registration.view.html',
    styleUrls: ['registration.view.scss']
})

export class RegistrationViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    private _lng!: number;
    private _lat!: number;
    public validateForm!: FormGroup;
    public loading = false;
    public errorMessage!: string;
    public localImage: any = 'assets/images/restaurant.jpg';
    public fileName!: string;
    constructor(
        private _fb: FormBuilder,
        private _registrationService: RegistrationService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._initForm();
        this._initMap();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            name: ['1', [Validators.required]],
            address: ['3', [Validators.required]],
            phoneNumber: ['3', [Validators.required]],
            email: ['3@mail.ru', [Validators.required, Validators.email]],
            openTime: ['2', [Validators.required]],
            closeTime: ['2', [Validators.required]],
            password: ['2', [Validators.required]]
        });
    }

    private _initMap(): void {
        const mapElement = document.getElementById('map');
        const map = new google.maps.Map(mapElement, {
            center: { lat: 40.19047994699609, lng: 44.51557200000002 },
            zoom: 8,
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            });
        }
        const marker = new google.maps.Marker({
            position: mapElement,
            map,
            title: 'Hello World!'
        });
        google.maps.event.addListener(map, 'click', (event: any) => {
            this._lat = event.latLng.lat();
            this._lng = event.latLng.lng();
            marker.setPosition(event.latLng);
        });

    }

    private _setFormDataImage(image: any): void {
        if (image && image.target) {
            const formData = new FormData();
            const fileList: FileList = image.target.files;
            if (fileList.length > 0) {
                const file: File = fileList[0];
                formData.append('avatar', file, file.name);
                
                // this._registrationService.uploatRestaurantProfileImage(formData)
                //     .subscribe((data: UploadFileResponse) => {
                //         this.localImage = data.url;
                //     });
            }
        }
    }


    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    public onClickRegistration(): void {

        const formData = new FormData();
        if (this.validateForm.invalid) {
            this.validateForm.markAllAsTouched();
            return;
        }
        this.loading = true;

        const registrationDetails: any = {
            name: this.validateForm.value.name,
            latitude: String(this._lat),
            longitude: String(this._lng),
            address: this.validateForm.value.address,
            phoneNumber: this.validateForm.value.phoneNumber,
            email: this.validateForm.value.email,
            openTime: +this.validateForm.value.openTime,
            closeTime: +this.validateForm.value.closeTime,
            password: this.validateForm.value.password,
        };
        // tslint:disable-next-line: forin
        for (const item in registrationDetails) {
            formData.append(item, registrationDetails[item]);
           
        }
        this._registrationService.registration(formData)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                }))
            .subscribe((data) => {
                this._router.navigate(['/login']);
            },
                err => {
                    this.errorMessage = err.message;
                }
            );
    }

    public handleFileSelect(evt: any): void {
        const files = evt.target.files;
        const file = files[0];
        if (files && file) {

            const reader = new FileReader();
            reader.onload = () => {
                const base64str = reader.result;
                this.localImage = base64str;
                console.log(this.localImage);

            };
            reader.readAsDataURL(file);
        }
        this._setFormDataImage(evt);
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
