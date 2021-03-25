import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class SongsService {
    constructor(private _httpClient: HttpClient) { }
}
