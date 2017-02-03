import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    getItem(key: string): string {
        return localStorage.getItem(key);
    }

    setItem(key: string, data: string): void {
        localStorage.setItem(key, data);
    }
}
