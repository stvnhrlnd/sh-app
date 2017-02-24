import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { ContentService } from './content.service';
import { MdPipe } from './md.pipe';
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';

export const entryComponents: any[] = [
    BlogComponent,
    HomeComponent,
    PostComponent
];

/**
 * Root module.
 *
 * @export
 * @class AppModule
 */
@NgModule({
    declarations: [
        routedComponents,
        AppComponent,
        MdPipe,
        entryComponents
    ],
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [ContentService],
    bootstrap: [AppComponent],
    entryComponents: entryComponents
})
export class AppModule {
}
