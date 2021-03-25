import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { IUser } from 'src/app/core/moduls/user';
import { UserService } from './user.service';

@Component({
    selector: 'app-user',
    templateUrl: 'user.view.html',
    styleUrls: ['user.view.scss']
})

export class UserViewComponent implements OnInit, OnDestroy {

    private _unsubscribe$ = new Subject<void>();
    public page = 1;
    public countAdmins!: number;
    public searchControl: FormControl = new FormControl('');
    public userDetails: IUser[] = [];
    public loading = false;
    constructor(private _userService: UserService) { }

    ngOnInit(): void { }

    public _getUser(): void{}

    ngOnDestroy(): void {
        this._unsubscribe$.next();
        this._unsubscribe$.complete();
    }
}
