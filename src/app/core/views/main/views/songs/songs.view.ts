import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ConfirmDeleteModalComponent } from 'src/app/core/globals/modals';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { ISongs } from 'src/app/core/moduls/songs';
import { AddSongModalComponent, ViewVideoModalComponent } from './modals';
import { SongsService } from './songs.service';
import { PageEvent } from '@angular/material/paginator';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-songs',
    templateUrl: 'songs.view.html',
    styleUrls: ['songs.view.scss']
})

export class SongsViewComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    public loading = false;
    public page = 1;
    public errorMessage!: string;
    public searchControl: FormControl = new FormControl('');
    public songsDetails: ISongs[] = [];
    public countSong!: number;
    public role!: string;

    constructor(
        private _songsService: SongsService,
        private _nzModalService: NzModalService,
        private _cookieService: CookieService
    ) {
        if (this._cookieService.get('role')){
            this.role = this._cookieService.get('role');
        }
    }

    ngOnInit(): void {
        this.searchControl.valueChanges.subscribe((data) => {
            if (data.length >= 3) {
                this._getSongs(false);
            }
            else {
                this._getSongs();
            }
        });
        this._getSongs();
    }

    private _getSongs(isShowLoading = true): void {
        if (isShowLoading) {
            this.loading = true;
        }
        const searchValue: string = this.searchControl.value;
        const page: number = this.page;
        this._songsService.getSongs(page, searchValue)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data: PaginatorResponse<ISongs[]>) => {
                this.countSong = data.count;
                this.songsDetails = data.data;
            });

    }
    private _deleteSongItem(id: number): void {
        this._songsService.deleteSongItem(id)
            .pipe(takeUntil(this._unsubscribe$),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this._getSongs();
            });
    }

    public onClickDeleteItem(item: ISongs): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Confirm Delete',
            nzContent: ConfirmDeleteModalComponent,
            nzFooter: 'false'
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data && data === 'confirm-delete') {
                this._deleteSongItem(item.id);
            }
        });
    }
    public onClickAddSongModal(): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'Add Song',
            nzContent: AddSongModalComponent,
            nzFooter: 'false',
        });
        dialogRef.afterClose.subscribe((data) => {
            if (data === 'Add Song') {
                this._getSongs();
            }
        });
    }
    public onClickOpenViewVideoModal(item: ISongs): void {
        const dialogRef = this._nzModalService.create({
            nzTitle: 'View Video',
            nzContent: ViewVideoModalComponent,
            nzFooter: 'false',
            nzComponentParams: { item }
        });
    }

    public paginate($event: PageEvent): void {
        this.page = $event.pageIndex + 1;
        this._getSongs();
    }



    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
