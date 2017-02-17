import { Component, OnInit } from '@angular/core';

import { Content } from './content';
import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    selector: 'sh-blog',
    templateUrl: 'blog.component.html',
    styleUrls: ['shared.css']
})
export class BlogComponent implements OnInit {
    posts: Content[] = [];

    constructor(private contentService: ContentService) {
    }

    ngOnInit() {
        this.posts = this.contentService.getByDocumentTypeAlias('post');
        this.posts.sort((a, b) => a.content.published > b.content.published ? -1 : 1);
    }
}
