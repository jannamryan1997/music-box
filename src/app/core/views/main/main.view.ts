import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: 'main.view.html',
    styleUrls: ['main.view.scss']
})

export class MainViewComponent implements OnInit, OnDestroy {
    public isCollapsed = false;
    constructor() { }

    ngOnInit(): void { }

    ngOnDestroy(): void { }
}
