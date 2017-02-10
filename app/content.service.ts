import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import * as jp from 'jsonpath';
import 'rxjs/add/operator/toPromise';

import { Content } from './content';
import { StorageService } from './storage.service';

@Injectable()
export class ContentService {
    private apiEndpoint = 'http://localhost:58463/Umbraco/Api/Content/';
    private content: Content[];

    constructor(private http: Http, private storageService: StorageService) {
        this.loadContent();
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

    contentAtJSONPath(pathExpression: string): Content[] {
        let content = jp.query(this.content, pathExpression);
        return content;
    }

    contentSingleAtJSONPath(pathExpression: string): Content {
        let content = this.contentAtJSONPath(pathExpression);
        return content[0];
    }

    getByDocumentTypeAlias(alias: string): Content[] {
        return this.contentAtJSONPath(`$..[?(@.documentTypeAlias == '${alias}')]`);
    }

    getByURL(url: string): Content {
        return this.contentSingleAtJSONPath(`$..[?(@.url == '${url}/')]`);
    }

    loadContent() {
        this.content = JSON.parse(this.storageService.getItem('content'));
    }

    sync(): Promise<any> {
        return this.http.get(`${this.apiEndpoint}Json`)
            .toPromise()
            .then(response => {
                let eTagHeader = response.headers.get('etag');
                let md5Hash = eTagHeader.replace(/"/g, '');
                this.storageService.setItem('contentHash', md5Hash);
                this.storageService.setItem('content', response.text());
                this.loadContent();
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
