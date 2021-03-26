import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-view-video',
    templateUrl: 'view-video.modal.html',
    styleUrls: ['view-video.modal.scss']
})

export class ViewVideoModalComponent implements OnInit, OnDestroy {
    private _unsubscribe$ = new Subject<void>();
    player: any;

    @Input() url!: string;
    public videoSources: any;

    constructor() {
        // this.videoSources = [{
        //     src: this.url,
        //     provider: 'youtube',
        // }];
    }

    ngOnInit(): void { }



    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
