import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { IAdmin, IAdminDedatils } from 'src/app/core/moduls/admin';
import { EmptyResponse } from 'src/app/core/moduls/authorization';

@Injectable()

export class AdminService {
    constructor(private _httpClient: HttpClient) {
    }
    public getAdmins(page: number, query: string): Observable<PaginatorResponse<IAdminDedatils[]>> {
        let params: HttpParams = new HttpParams();
        params = params.set('page', String(page));
        params = params.set('query', query);
        return this._httpClient.get<PaginatorResponse<IAdminDedatils[]>>('admin/', { params });
    }

    public addAdmin(body: IAdmin): Observable<any> {
        return this._httpClient.post<any>('admin/add', body);
    }

    public deleteAdmin(id: number): Observable<EmptyResponse> {
        return this._httpClient.delete(`admin/${id}`);
    }
}
