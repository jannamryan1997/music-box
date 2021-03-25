import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-mat-spinner',
    templateUrl: 'mat-spinner.component.html',
    styleUrls: ['mat-spinner.component.scss']
})

export class MatSpinnerComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();

    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }
}
