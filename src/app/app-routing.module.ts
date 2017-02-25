import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentGuard } from './content-guard.service';
import { MasterComponent } from './master/master.component';
import { SyncComponent } from './sync/sync.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/sync',
        pathMatch: 'full'
    },
    {
        path: 'sync',
        component: SyncComponent
    },
    {
        path: '**',
        component: MasterComponent,
        canActivate: [ContentGuard]
    }
];

/**
 * Defines app routes.
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ContentGuard]
})
export class AppRoutingModule {
}

export const routedComponents = [MasterComponent, SyncComponent];
