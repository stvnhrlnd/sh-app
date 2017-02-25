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
     * Flag to indicate that an error has occurred.
     *
     *
     * @memberof SyncComponent
     */
    syncError = false;

    /**
     * The URL to navigate to after syncing.
     *
     * @private
     *
     * @memberof SyncComponent
     */
    private redirectUrl = '/home';

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
        // Check route params for alternative redirect URL
        this.route.params.subscribe(params => {
            if (params['redirectUrl']) {
                this.redirectUrl = params['redirectUrl'];
            }
        });

        this.contentService.checkForUpdates().then(result => {
            if (result) {
                this.contentService.sync().then(() => {
                    this.router.navigate([this.redirectUrl]);
                }).catch(() => this.handleError());
            } else {
                this.router.navigate([this.redirectUrl]);
            }
        }).catch(() => this.handleError());
    }

    /**
     * Handles sync errors.
     *
     * @private
     *
     * @memberof SyncComponent
     */
    private handleError() {
        // If local content is available from a previous sync then proceed as
        // normal, otherwise show an error message in the view.
        if (localStorage.getItem('contentHash') != null) {
            this.router.navigate([this.redirectUrl]);
        } else {
            this.syncError = true;
        }
    }
}
