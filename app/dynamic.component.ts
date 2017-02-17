import {
    Component,
    ComponentFactoryResolver,
    Input,
    OnChanges,
    ReflectiveInjector,
    SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

import { entryComponents } from './app.module';
import { Content } from './content';

@Component({
    moduleId: module.id,
    selector: 'sh-dynamic',
    template: '<div #componentContainer></div>'
})
export class DynamicComponent implements OnChanges {
    @ViewChild('componentContainer', { read: ViewContainerRef })
    componentContainer: ViewContainerRef;

    @Input()
    content: Content;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.componentContainer.clear();

        if (this.content) {
            let component = entryComponents
                .find(c => c.name === `${this.content.template}Component`);

            if (component) {
                let resolvedInputs = ReflectiveInjector.resolve([
                    { provide: 'content', useValue: this.content }
                ]);
                let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs,
                    this.componentContainer.parentInjector);

                let factory = this.componentFactoryResolver
                    .resolveComponentFactory(component);
                let componentref = factory.create(injector);

                this.componentContainer.insert(componentref.hostView);
            }
        }
    }
}
