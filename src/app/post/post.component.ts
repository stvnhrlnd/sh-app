import { Component, Inject } from '@angular/core';

import { Content } from '../content';

/**
 * Displays a blog post.
 *
 * @export
 * @class PostComponent
 */
@Component({
    moduleId: module.id,
    selector: 'app-post',
    templateUrl: 'post.component.html',
    styleUrls: ['../shared.css']
})
export class PostComponent {
    /**
     * The post currently being displayed.
     *
     * @type {Content}
     * @memberof PostComponent
     */
    content: Content;

    /**
     * Creates an instance of PostComponent.
     *
     * @param {Content} content
     *
     * @memberof PostComponent
     */
    constructor(@Inject('content') content: Content) {
        this.content = content;
    }
}
