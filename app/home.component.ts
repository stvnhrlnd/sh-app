import { Component, OnInit } from '@angular/core';

import { Content } from './content';
import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    selector: 'sh-home',
    templateUrl: 'home.component.html',
    styleUrls: ['shared.css']
})
export class HomeComponent implements OnInit {
    private latestPost: Content;

    constructor(private contentService: ContentService) {
    }

    ngOnInit() {
        let posts = this.contentService.getByDocumentTypeAlias('post');
        posts.sort((a, b) => a.content.published > b.content.published ? -1 : 1);
        this.latestPost = posts[0];
    }
}
