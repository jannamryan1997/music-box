import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatorResponse } from 'src/app/core/globals/modals/paginator-response';
import { EmptyResponse } from 'src/app/core/moduls/authorization';
import { ISongs } from 'src/app/core/moduls/songs';


@Injectable()

export class SongsService {
    constructor(private _httpClient: HttpClient) { }


    public getSongs(page: number, query: string): Observable<PaginatorResponse<ISongs[]>> {
        let params: HttpParams = new HttpParams();
        params = params.set('page', String(page));
        params = params.set('query', query);
        return this._httpClient.get<PaginatorResponse<ISongs[]>>('song/', { params });
    }

    public deleteSongItem(id: number): Observable<EmptyResponse> {
        return this._httpClient.delete<EmptyResponse>(`song/${id}`);
    }
    public addSong(data: any): Observable<any> {
        return this._httpClient.post('song/add', data);
    }
}
