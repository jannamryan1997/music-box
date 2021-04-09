import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, map, switchMap, filter, take } from 'rxjs/operators';
import { Subject, Observable, forkJoin, BehaviorSubject, interval, of } from 'rxjs';
import { PlayListItem } from 'src/app/core/moduls/player-list';;
import { UserService } from 'src/app/core/services/user.service';
import { RestaurantSongService } from './restaurant-song.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-restaurant-song',
    templateUrl: 'reataurant-song.view.html',
    styleUrls: ['reataurant-song.view.scss']
})
export class RestaurantSongViewComponent implements OnInit,  OnDestroy {
    private _unsubscribe$: Subject<void> = new Subject<void>();
    private _restaurantId!: any;
    private _currentVideoId!: string;
    private _ytReadyEvent$: BehaviorSubject<boolean> = new BehaviorSubject<any>(null);
    private _ordersCompleted: BehaviorSubject<boolean> = new BehaviorSubject<any>(null);
    private _YT: any;
    private _player: any;
    public currentSong!: PlayListItem;
    public playList: PlayListItem[] = [];
    public firstScriptTag: any;

    constructor(
        private _userService: UserService,
        private _restaurantSongService: RestaurantSongService,
        private _cookieService: CookieService
    ) {
        if (this._cookieService.get('restaurantId')) {
            this._restaurantId = this._cookieService.get('restaurantId');
        }
        // this._restaurantId = this._userService.getUserSync().id;
    }

    ngOnInit(): void {
        this._initPlayer();
        this._fetchMainData();
        this._getPlayListInterval();
    }

    private _fetchMainData(): void {
        // tslint:disable-next-line: deprecation
        const combined = forkJoin(
            this._getPlayList(),
            this._getCurrentSong()
        );
        combined
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe();
    }

    private _getPlayListInterval(): void {
        interval(5000)
            .pipe(
                takeUntil(this._unsubscribe$),
                switchMap((_) => {
                    return this._getPlayList();
                })
            ).subscribe();
    }

    private _getPlayList(): Observable<void> {
        return this._restaurantSongService.getPlayList(this._restaurantId)
            .pipe(
                takeUntil(this._unsubscribe$),
                switchMap((data) => {
                    this.playList = data;
                    console.log(this.playList);
                    
                    return this._ordersCompleted
                        .asObservable()
                        .pipe(
                            filter(v => v != null),
                            take(1),
                            switchMap((value) => {
                                if (value) {
                                    console.log('dddddd1231221');
                                    return this._getCurrentSong();
                                }
                                const v = () => { return };
                                return of(v());
                            })
                        );
                })
            );
    }

    private _getCurrentSong(): Observable<void> {
        return this._restaurantSongService.getCurrentSong()
            .pipe(
                takeUntil(this._unsubscribe$),
                switchMap((data) => {
                    const v = () => { return };
                    if (data) {
                        if (Object.keys(data).length === 0) {
                            this._ordersCompleted.next(true);
                            return of(v());
                        }
                        this._ordersCompleted.next(false);
                        this.currentSong = data;
                        this._currentVideoId = this._parseYoutubeUrl(this.currentSong.url);
                        return this._ytReadyEvent$
                            .asObservable()
                            .pipe(
                                filter((v) => v != null),
                                map((_) => {
                                    this._player.loadVideoById({
                                        videoId: this._currentVideoId,
                                        startSeconds: this.currentSong.startSecond || 0,
                                        endSeconds: this.currentSong.endSecond || 0,
                                    });
                                })
                            );
                    }
                    return of(v());
                })
            );
    }

    private _nextSong(): void {
        this._restaurantSongService.getNextSong(this.currentSong.orderId)
            .pipe(takeUntil(this._unsubscribe$))
            .subscribe((data) => {
                if (data) {
                    if (Object.keys(data).length == 0) {
                        this.currentSong = {} as PlayListItem;
                        this._ordersCompleted.next(true);
                        return;
                    }
                    this._ordersCompleted.next(false);
                    this.currentSong = data;
                    this._currentVideoId = this._parseYoutubeUrl(this.currentSong.url);
                    this._player.loadVideoById({
                        videoId: this._currentVideoId,
                        startSeconds: this.currentSong.startSecond || 0,
                        endSeconds: this.currentSong.endSecond || 0,
                    });
                }
            });
    }

    private _parseYoutubeUrl(url: string): any {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : null;
    }

    private _initPlayer(): void {
        if (window['YT']) {
            this._startVideo();
            return;
        }
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
          this.firstScriptTag = document.getElementsByTagName('script')[0];
         this.firstScriptTag.parentNode.insertBefore(tag, this.firstScriptTag);

        window['onYouTubeIframeAPIReady'] = () => this._startVideo();
    }

    private _startVideo(): void {
        this._YT = window['YT'];
        this._player = new window['YT'].Player('player', {
            events: {
                onStateChange: this._onPlayerStateChange.bind(this),
                onError: this._onPlayerError.bind(this),
                onReady: (e) => {
                    this._ytReadyEvent$.next(true);
                }
            }
        });
    }

    private _onPlayerStateChange(event: any): void {
        switch (event.data) {
            case window['YT'].PlayerState.PLAYING: {
                if (this._cleanTime() == 0) {
                    console.log('started ' + this._cleanTime());
                } else {
                    console.log('playing ' + this._cleanTime());
                };
                break;
            }
            case window['YT'].PlayerState.PAUSED: {
                if (this._player.getDuration() - this._player.getCurrentTime() != 0) {
                    console.log('paused' + ' @ ' + this._cleanTime());
                };
                break;
            }
            case window['YT'].PlayerState.ENDED: {
                this._nextSong();
                break;
            }

        };
    };

    private _cleanTime(): number {
        return Math.round(this._player.getCurrentTime());
    };

    private _onPlayerError(event: any): void {
        switch (event.data) {
            case 2:
                break;
            case 100:
                break;
            case 101 || 150:
                break;
        };
    };

    public identify(index: number, item: PlayListItem): number {
        return item.orderId;
    }

    public onClickView(item: PlayListItem): void { }

    ngOnDestroy(): void { }
}
