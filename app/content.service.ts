import { Injectable } from '@angular/core';

import * as jp from 'jsonpath';

import { Content } from './content';
import { StorageService } from './storage.service';

@Injectable()
export class ContentService {
    private content: Content[];

    constructor(private storageService: StorageService) {
        this.loadContent();
    }

    contentAtJSONPath(pathExpression: string): Content[] {
        let content = jp.query(this.content, pathExpression);
        return content;
    }

    contentSingleAtJSONPath(pathExpression: string): Content {
        let content = this.contentAtJSONPath(pathExpression);
        return content[0];
    }

    loadContent() {
        this.content = JSON.parse(this.storageService.getItem('content'));
    }
}
