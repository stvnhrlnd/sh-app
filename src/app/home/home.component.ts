import { Component, OnInit } from '@angular/core';

import { Content } from '../content';
import { ContentService } from '../content.service';

/**
 * Displays the latest blog post.
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
    moduleId: module.id,
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['../shared.css']
})
export class HomeComponent implements OnInit {
    /**
     * The post currently being displayed.
     *
     * @type {Content}
     * @memberof HomeComponent
     */
    latestPost: Content;

    /**
     * Creates an instance of HomeComponent.
     *
     * @param {ContentService} contentService
     *
     * @memberof HomeComponent
     */
    constructor(private contentService: ContentService) {
    }

    /**
     * Gets the most recent blog post.
     *
     *
     * @memberof HomeComponent
     */
    ngOnInit() {
        const posts = this.contentService.getByDocumentTypeAlias('post');
        posts.sort((a, b) => a.content.published > b.content.published ? -1 : 1);
        this.latestPost = posts[0];
    }
}
