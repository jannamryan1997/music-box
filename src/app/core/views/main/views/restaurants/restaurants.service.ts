import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { IResataurants } from 'src/app/core/moduls/restaurants';

@Injectable()

export class ReataurantService {

    constructor(private _httpClient: HttpClient) { }

    public getRestaurant(page: number, query: string): Observable<PaginatorResponse<IResataurants[]>> {
        let params: HttpParams = new HttpParams();
        params = params.set('page', String(page));
        params = params.set('query', query);
        return this._httpClient.get<PaginatorResponse<IResataurants[]>>('restaurant/', { params });
    }
}
