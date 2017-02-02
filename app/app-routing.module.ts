import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [SyncComponent];
