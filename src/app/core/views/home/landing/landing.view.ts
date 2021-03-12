import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IsAlternativeService } from 'src/app/core/services/isAlternative.service';

@Component({
    selector: 'app-landing',
    templateUrl: 'landing.view.html',
    styleUrls: ['landing.view.scss']
})

export class LandingViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public isAlternative = false;

    constructor(private _isAlternativeService: IsAlternativeService) {
        this._isAlternativeService.getisAlternative()
            .subscribe((data) => {
                this.isAlternative = data;
                console.log(this.isAlternative);

            });
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
