import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthorization } from 'src/app/core/moduls/authorization';
import { ILogin } from 'src/app/core/moduls/login';

@Injectable()

export class LoginService {
    constructor(private _httpClient: HttpClient) { }

    public login(body: ILogin): Observable<IAuthorization> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        return this._httpClient.post<IAuthorization>('admin/login', body);
    }
}
