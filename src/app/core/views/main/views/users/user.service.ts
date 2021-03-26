import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { EmptyResponse } from 'src/app/core/moduls/authorization';
import { IUser } from 'src/app/core/moduls/user';

@Injectable()

export class UserService {

    constructor(private _httpClient: HttpClient) { }

    public getUser(page: number, query: string): Observable<PaginatorResponse<IUser[]>> {
        let params: HttpParams = new HttpParams();
        params = params.set('page', String(page));
        params = params.set('query', query);
        return this._httpClient.get<PaginatorResponse<IUser[]>>('user/', { params });
    }
    public deleteUserItem(id: number): Observable<EmptyResponse> {
        return this._httpClient.delete<EmptyResponse>(`user/${id}`);
    }
}
