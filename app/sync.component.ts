import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContentService } from './content.service';

@Component({
    moduleId: module.id,
    selector: 'sh-sync',
    templateUrl: 'sync.component.html',
    styleUrls: ['sync.component.css']
})
export class SyncComponent implements OnInit {
    constructor(private router: Router, private contentService: ContentService) {
    }

    ngOnInit() {
        this.contentService.checkForUpdates().then(result => {
            if (result) {
                this.contentService.sync().then(() => {
                    this.router.navigate(['/home']);
                });
            } else {
                this.router.navigate(['/home']);
            }
        });
    }
}
