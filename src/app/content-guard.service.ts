import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';

/**
 * Prevents component activation before content has been synced.
 *
 * @export
 * @class ContentGuard
 * @implements {CanActivate}
 */
@Injectable()
export class ContentGuard implements CanActivate {
    /**
     * Creates an instance of ContentGuard.
     *
     * @param {Router} router
     *
     * @memberof ContentGuard
     */
    constructor(private router: Router) {
    }

    /**
     * Checks if the content hash exists in local storage and redirects to sync
     * if it doesn't.
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     *
     * @memberof ContentGuard
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const contentHash = localStorage.getItem('contentHash');
        if (contentHash != null) {
            return true;
        }

        this.router.navigate(['/sync', { redirectUrl: state.url }]);
        return false;
    }
}
