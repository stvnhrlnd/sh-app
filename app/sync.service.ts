import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { StorageService } from './storage.service';

@Injectable()
export class SyncService {
    private apiEndpoint = 'http://localhost:58463/Umbraco/Api/Content/';

    constructor(private http: Http, private storageService: StorageService) {
    }

    checkForUpdates(): Promise<boolean> {
        let md5Hash = this.storageService.getItem('contentHash');
        if (!md5Hash) {
            return Promise.resolve(true);
        }

        let searchParams = new URLSearchParams();
        searchParams.set('hash', md5Hash);
        return this.http
            .get(`${this.apiEndpoint}ValidateMd5`, { search: searchParams })
            .toPromise()
            .then(response => !response.json())
            .catch(this.handleError);
    }

    sync(): Promise<any> {
        return this.http.get(`${this.apiEndpoint}Json`)
            .toPromise()
            .then(response => {
                let eTagHeader = response.headers.get('etag');
                let md5Hash = eTagHeader.replace(/"/g, '');
                this.storageService.setItem('contentHash', md5Hash);
                this.storageService.setItem('content', response.text());
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
