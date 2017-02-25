import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';

import * as jp from 'jsonpath';
import 'rxjs/add/operator/toPromise';

import { Content } from './content';

/**
 *
 *
 * @export
 * @class ContentService
 */
@Injectable()
export class ContentService {
    /**
     *
     *
     * @private
     *
     * @memberof ContentService
     */
    private apiEndpoint = 'http://www.stevenhar.land/Umbraco/Api/JsonCache/';

    /**
     *
     *
     * @private
     * @type {Content[]}
     * @memberof ContentService
     */
    private content: Content[];

    /**
     * Creates an instance of ContentService.
     * @param {Http} http
     *
     * @memberof ContentService
     */
    constructor(private http: Http) {
        this.loadContent();
    }

    /**
     *
     *
     * @returns {Promise<boolean>}
     *
     * @memberof ContentService
     */
    checkForUpdates(): Promise<boolean> {
        const md5Hash = localStorage.getItem('contentHash');
        if (!md5Hash) {
            return Promise.resolve(true);
        }

        const searchParams = new URLSearchParams();
        searchParams.set('hash', md5Hash);
        return this.http
            .get(`${this.apiEndpoint}Validate`, { search: searchParams })
            .toPromise()
            .then(response => !response.json())
            .catch(this.handleError);
    }

    /**
     *
     *
     * @param {string} pathExpression
     * @returns {Content[]}
     *
     * @memberof ContentService
     */
    contentAtJSONPath(pathExpression: string): Content[] {
        const content = jp.query(this.content, pathExpression);
        return content;
    }

    /**
     *
     *
     * @param {string} pathExpression
     * @returns {Content}
     *
     * @memberof ContentService
     */
    contentSingleAtJSONPath(pathExpression: string): Content {
        const content = this.contentAtJSONPath(pathExpression);
        return content[0];
    }

    /**
     *
     *
     * @param {string} alias
     * @returns {Content[]}
     *
     * @memberof ContentService
     */
    getByDocumentTypeAlias(alias: string): Content[] {
        return this.contentAtJSONPath(`$..[?(@.documentTypeAlias == '${alias}')]`);
    }

    /**
     *
     *
     * @param {string} url
     * @returns {Content}
     *
     * @memberof ContentService
     */
    getByURL(url: string): Content {
        return this.contentSingleAtJSONPath(`$..[?(@.url == '${url}/')]`);
    }

    /**
     *
     *
     * @returns {Promise<any>}
     *
     * @memberof ContentService
     */
    sync(): Promise<any> {
        return this.http.get(`${this.apiEndpoint}Download`)
            .toPromise()
            .then(response => {
                const eTagHeader = response.headers.get('etag');
                const md5Hash = eTagHeader.replace(/"/g, '');
                localStorage.setItem('contentHash', md5Hash);
                localStorage.setItem('content', response.text());
                this.loadContent();
            })
            .catch(this.handleError);
    }

    /**
     *
     *
     * @private
     * @param {*} error
     * @returns {Promise<any>}
     *
     * @memberof ContentService
     */
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    /**
     *
     *
     *
     * @memberof ContentService
     */
    private loadContent() {
        this.content = JSON.parse(localStorage.getItem('content'));
    }
}
