import { Component } from '@angular/core';

import { SyncService } from './sync.service';

@Component({
    moduleId: module.id,
    selector: 'sh-sync',
    templateUrl: 'sync.component.html'
})
export class SyncComponent {
    constructor(private syncService: SyncService) {
    }
}
