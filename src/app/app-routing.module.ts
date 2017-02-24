import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
        component: MasterComponent
    }
];

/**
 *
 *
 * @export
 * @class AppRoutingModule
 */
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [MasterComponent, SyncComponent];
