import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class IsAlternativeService {

    public isAlternative = new BehaviorSubject<boolean>(false);

    constructor() { }

    public sentisAlternative(value: boolean): void {
        this.isAlternative.next(value);
    }

    public getisAlternative(): Observable<boolean> {
        return this.isAlternative.asObservable();
    }
}
