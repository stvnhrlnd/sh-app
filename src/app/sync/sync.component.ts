import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private contentService: ContentService) {
    }

    /**
     * Checks for updates and syncs before navigating to the next page.
     *
     *
     * @memberof SyncComponent
     */
    ngOnInit() {
        // Redirect to home unless a specific redirect URL has been passed as
        // a route parameter.
        let redirectUrl = '/home';
        this.route.params.subscribe(params => {
            if (params['redirectUrl']) {
                redirectUrl = params['redirectUrl'];
            }
        });

        this.contentService.checkForUpdates().then(result => {
            if (result) {
                this.contentService.sync().then(() => {
                    this.router.navigate([redirectUrl]);
                });
            } else {
                this.router.navigate([redirectUrl]);
            }
        });
    }
}
