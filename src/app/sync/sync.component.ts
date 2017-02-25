import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ContentService } from '../content.service';

/**
 * Updates app content.
 *
 * @export
 * @class SyncComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-sync',
    templateUrl: './sync.component.html',
    styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit {
    /**
     * Creates an instance of SyncComponent.
     *
     * @param {Router} router
     * @param {ContentService} contentService
     *
     * @memberof SyncComponent
     */
    constructor(private router: Router, private contentService: ContentService) {
    }

    /**
     * Checks for updates and syncs before navigating to home page.
     *
     *
     * @memberof SyncComponent
     */
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
