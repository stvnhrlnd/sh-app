import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterComponent } from './master.component';
import { SyncComponent } from './sync.component';

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

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [MasterComponent, SyncComponent];
