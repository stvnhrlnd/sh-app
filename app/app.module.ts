import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DynamicComponent } from './dynamic.component';
import { HomeComponent } from './home.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ContentService } from './content.service';
import { StorageService } from './storage.service';

export const entryComponents: any[] = [HomeComponent];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DynamicComponent,
        HomeComponent,
        routedComponents
    ],
    bootstrap: [AppComponent],
    providers: [
        ContentService,
        StorageService
    ],
    entryComponents: entryComponents
})
export class AppModule {
}
