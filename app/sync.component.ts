import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SyncService } from './sync.service';

@Component({
    moduleId: module.id,
    selector: 'sh-sync',
    templateUrl: 'sync.component.html',
    styleUrls: ['sync.component.css']
})
export class SyncComponent implements OnInit {
    constructor(private router: Router, private syncService: SyncService) {
    }

    ngOnInit() {
        this.syncService.checkForUpdates().then(result => {
            if (result) {
                this.syncService.sync().then(() => {
                    this.router.navigate(['/home']);
                });
            } else {
                this.router.navigate(['/home']);
            }
        });
    }
}
