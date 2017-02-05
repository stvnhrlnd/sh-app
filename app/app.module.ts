import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ContentService } from './content.service';
import { StorageService } from './storage.service';
import { SyncService } from './sync.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        routedComponents
    ],
    bootstrap: [AppComponent],
    providers: [
        ContentService,
        StorageService,
        SyncService
    ]
})
export class AppModule {
}
