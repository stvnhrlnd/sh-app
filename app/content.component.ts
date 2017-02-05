import { Component } from '@angular/core';

import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    selector: 'sh-content',
    templateUrl: 'content.component.html'
})
export class ContentComponent {
    constructor(private contentService: ContentService) {
    }
}
