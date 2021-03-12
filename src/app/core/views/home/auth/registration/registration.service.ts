import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRegistration } from 'src/app/core/moduls/registration';
import { Observable } from 'rxjs';

@Injectable()

export class RegistrationService {
    constructor(private _httpClient: HttpClient) { }

    public registration(body: IRegistration): Observable<any> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        console.log(params);
        return this._httpClient.post<any>('admin/add', body);
    }
}
