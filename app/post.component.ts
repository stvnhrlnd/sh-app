import { Component, Inject } from '@angular/core';

import { Content } from './content';

@Component({
    moduleId: module.id,
    selector: 'sh-post',
    templateUrl: 'post.component.html',
    styleUrls: ['shared.css']
})
export class PostComponent {
    constructor(
        @Inject('content') private content: Content) {
    }
}
