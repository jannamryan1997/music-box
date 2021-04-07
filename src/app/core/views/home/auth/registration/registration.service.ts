import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IRegistrationRestaurant } from 'src/app/core/moduls/registration';
import { Observable } from 'rxjs';
import { EmptyResponse } from 'src/app/core/moduls/authorization';
import { UploadFileResponse } from 'src/app/core/moduls/upload-file';
import { IRestaurantResponse } from 'src/app/core/moduls/restaurants';

@Injectable()

export class RegistrationService {
    constructor(private _httpClient: HttpClient) { }

    public registration(body: FormData): Observable<IRestaurantResponse> {
        let params = new HttpParams();
        params = params.set('authorization', 'false');
        return this._httpClient.post<IRestaurantResponse>('restaurant/add', body);
    }

    public uploatRestaurantProfileImage(file: FormData): Observable<UploadFileResponse> {
        return this._httpClient.post<UploadFileResponse>('restaurant/upload-avatar', file);
    }
}
