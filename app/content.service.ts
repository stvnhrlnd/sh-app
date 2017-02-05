import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

@Injectable()
export class ContentService {
    constructor(private storageService: StorageService) {
    }
}
