import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { IResataurants } from 'src/app/core/moduls/restaurants';
import { IGenres, IGenresDetails, ISongDetails } from 'src/app/core/moduls/songs';
import { SongsService } from '../../songs.service';

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
    public generedDetail: IGenresDetails[] = [];
    public restaurantDetail: IResataurants[] = [];

    constructor(
        private _fb: FormBuilder,
        private _songsService: SongsService,
        private _NzModalRef: NzModalRef) { }

    ngOnInit(): void {
        this._initForm();
        this._getGeneres();
    }

    private _initForm(): void {
        this.validateForm = this._fb.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            url: ['', Validators.required],
            startSecond: ['', Validators.required],
            endSecond: ['', Validators.required],
            genered: ['', Validators.required],
        });
    }

    private _getGeneres(): void {
        this._songsService.getSongGenres()
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => { })
            )
            .subscribe((data: IGenres) => {
                this.generedDetail = data.genres;

            });
    }
    private _getRestaurants(): void {
        this._songsService.getRestaurant(1, '')
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: PaginatorResponse<IResataurants[]>) => {
                this.restaurantDetail = data.data;
            });
    }


    public submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }
    public addSongs(): void {
        this.loading = true;
        const { name, url } = this.validateForm.value;
        const sondData: ISongDetails = {
            name,
            url,
            price: Number(this.validateForm.value.price),
            startSecond: Number(this.validateForm.value.startSecond),
            endSecond: Number(this.validateForm.value.endSecond),
            genreId: Number(this.validateForm.value.genered.id),
             restaurantId: 1
        };
        this._songsService.addSong(sondData)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._NzModalRef.close('Add Song');

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
