import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
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
    public videoUrlId!: string;

    constructor() { }

    ngOnInit(): void {
            this.videoUrlId = this._parseYoutubeUrl(this.item?.url);
    }

    private _parseYoutubeUrl(url: string): any {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : null;
    }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
