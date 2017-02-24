import { Component, Inject } from '@angular/core';

import { Content } from '../content';

/**
 *
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
     *
     *
     * @type {Content}
     * @memberOf PostComponent
     */
    content: Content;

    /**
     * Creates an instance of PostComponent.
     * @param {Content} content
     *
     * @memberOf PostComponent
     */
    constructor(@Inject('content') content: Content) {
        this.content = content;
    }
}
