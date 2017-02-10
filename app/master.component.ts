import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Content } from './content';
import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    selector: 'sh-master',
    templateUrl: 'master.component.html',
    styleUrls: ['master.component.css']
})
export class MasterComponent implements OnInit {
    private siteName: string;
    private content: Content;

    constructor(
        private router: Router,
        private contentService: ContentService) {
    }

    ngOnInit() {
        let website = this.contentService
            .contentSingleAtJSONPath('$..[?(@.documentTypeAlias == "website")]');
        this.siteName = website.content.siteName;

        this.loadContent(this.router.url);
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loadContent(event.url);
            }
        });
    }

    private loadContent(url: string) {
        this.content = this.contentService
            .contentSingleAtJSONPath(`$..[?(@.url == "${url}/")]`);
    }
}
