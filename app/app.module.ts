import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { MarkdownToHtmlPipe } from 'markdown-to-html-pipe';

import { AppComponent } from './app.component';
import { BlogComponent } from './blog.component';
import { DynamicComponent } from './dynamic.component';
import { HomeComponent } from './home.component';
import { PostComponent } from './post.component';
import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ContentService } from './content.service';
import { StorageService } from './storage.service';

export const entryComponents: any[] = [
    BlogComponent,
    HomeComponent,
    PostComponent
];

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        MarkdownToHtmlPipe,
        AppComponent,
        BlogComponent,
        DynamicComponent,
        HomeComponent,
        PostComponent,
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
