import { Component, OnInit } from '@angular/core';

import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    selector: 'sh-content',
    templateUrl: 'content.component.html',
    styleUrls: ['content.component.css']
})
export class ContentComponent implements OnInit {
    private siteName: string;

    constructor(private contentService: ContentService) {
    }

    ngOnInit() {
        let website = this.contentService
            .contentSingleAtJSONPath('$..[?(@.documentTypeAlias == "website")]');
        this.siteName = website.content.siteName;
    }
}
