import {
    Component,
    ComponentFactoryResolver,
    OnInit,
    ReflectiveInjector,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { ContentService } from '../content.service';
import { BlogComponent } from '../blog/blog.component';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from '../post/post.component';

const templateComponents = {
    'Blog': BlogComponent,
    'Home': HomeComponent,
    'Post': PostComponent
};

/**
 *
 *
 * @export
 * @class MasterComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'app-master',
    templateUrl: './master.component.html',
    styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
    /**
     *
     *
     * @type {ViewContainerRef}
     * @memberof MasterComponent
     */
    @ViewChild('contentContainer', { read: ViewContainerRef })
    contentContainer: ViewContainerRef;

    /**
     *
     *
     * @type {string}
     * @memberof MasterComponent
     */
    siteName: string;

    /**
     * Creates an instance of MasterComponent.
     * @param {ComponentFactoryResolver} componentFactoryResolver
     * @param {Router} router
     * @param {ContentService} contentService
     *
     * @memberof MasterComponent
     */
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private contentService: ContentService) {
    }

    /**
     *
     *
     *
     * @memberof MasterComponent
     */
    ngOnInit() {
        const website = this.contentService.getByDocumentTypeAlias('website')[0];
        this.siteName = website.content.siteName;

        this.loadContent(this.router.url);
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loadContent(event.url);
            }
        });
    }

    /**
     *
     *
     * @private
     * @param {string} url
     *
     * @memberof MasterComponent
     */
    private loadContent(url: string) {
        this.contentContainer.clear();

        const content = this.contentService.getByURL(url);
        if (content) {
            const component = templateComponents[content.template];
            if (component) {
                const resolvedInputs = ReflectiveInjector.resolve([
                    { provide: 'content', useValue: content }
                ]);
                const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs,
                    this.contentContainer.parentInjector);

                const factory = this.componentFactoryResolver
                    .resolveComponentFactory(component);
                const componentref = factory.create(injector);

                this.contentContainer.insert(componentref.hostView);
            }
        }
    }
}
