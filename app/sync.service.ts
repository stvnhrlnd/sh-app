import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable()
export class SyncService {
    constructor(private storageService: StorageService) {
    }
}
