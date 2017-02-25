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

// Maps Umbraco template name to Angular component
const templateComponents = {
    'Blog': BlogComponent,
    'Home': HomeComponent,
    'Post': PostComponent
};

/**
 * Displays common page elements (e.g., header and footer) and renders the
 * current content dynamically based on the URL.
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
     * The dynamic component container.
     *
     * @type {ViewContainerRef}
     * @memberof MasterComponent
     */
    @ViewChild('contentContainer', { read: ViewContainerRef })
    contentContainer: ViewContainerRef;

    /**
     * Flag to indicate that the current URL does not match an Umbraco
     * document.
     *
     *
     * @memberof MasterComponent
     */
    pageNotFound = false;

    /**
     * The site title.
     *
     * @type {string}
     * @memberof MasterComponent
     */
    siteName: string;

    /**
     * Creates an instance of MasterComponent.
     *
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
     * Initialises the component.
     *
     *
     * @memberof MasterComponent
     */
    ngOnInit() {
        const website = this.contentService.getByDocumentTypeAlias('website')[0];
        this.siteName = website.content.siteName;

        // Load the initial content
        this.loadContent(this.router.url);

        // When the route changes load new content
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.loadContent(event.url);
            }
        });
    }

    /**
     * Loads content onto the page.
     *
     * @private
     * @param {string} url - The URL of the content node.
     *
     * @memberof MasterComponent
     */
    private loadContent(url: string) {
        this.contentContainer.clear();

        const content = this.contentService.getByURL(url);
        if (content) {
            this.pageNotFound = false;

            // Get the component that will be used to render the content
            const component = templateComponents[content.template];
            if (component) {
                // Create an injector that will inject the content node into
                // the dynamically created component.
                const resolvedInputs = ReflectiveInjector.resolve([
                    { provide: 'content', useValue: content }
                ]);
                const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs,
                    this.contentContainer.parentInjector);

                // Create the component and insert it into the view container
                const factory = this.componentFactoryResolver
                    .resolveComponentFactory(component);
                const componentref = factory.create(injector);
                this.contentContainer.insert(componentref.hostView);
            }
        } else {
            this.pageNotFound = true;
        }
    }
}
