import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ISongs } from 'src/app/core/moduls/songs';

@Component({
    selector: 'app-view-video',
    templateUrl: 'view-video.modal.html',
    styleUrls: ['view-video.modal.scss']
})

export class ViewVideoModalComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    @Input() item!: ISongs;

    constructor() {}

    ngOnInit(): void {
    }


    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
