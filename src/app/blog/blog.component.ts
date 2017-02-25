import { Component, OnInit } from '@angular/core';

import { Content } from '../content';
import { ContentService } from '../content.service';

/**
 * Displays a list of blog posts.
 *
 * @export
 * @class BlogComponent
 * @implements {OnInit}
 */
@Component({
    moduleId: module.id,
    selector: 'app-blog',
    templateUrl: 'blog.component.html',
    styleUrls: ['../shared.css']
})
export class BlogComponent implements OnInit {
    /**
     * The posts currently being displayed.
     *
     * @type {Content[]}
     * @memberof BlogComponent
     */
    posts: Content[] = [];

    /**
     * Creates an instance of BlogComponent.
     *
     * @param {ContentService} contentService
     *
     * @memberof BlogComponent
     */
    constructor(private contentService: ContentService) {
    }

    /**
     * Gets the posts to display.
     *
     *
     * @memberof BlogComponent
     */
    ngOnInit() {
        this.posts = this.contentService.getByDocumentTypeAlias('post');

        // Sort most recent first
        this.posts.sort((a, b) => a.content.published > b.content.published ? -1 : 1);
    }
}
