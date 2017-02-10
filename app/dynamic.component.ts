import { Component, ComponentFactoryResolver, Input, OnChanges, ViewChild, ViewContainerRef } from '@angular/core';

import { entryComponents } from './app.module';
import { Content } from './content';

@Component({
    moduleId: module.id,
    selector: 'sh-dynamic',
    template: '<div #componentContainer></div>'
})
export class DynamicComponent implements OnChanges {
    @ViewChild('componentContainer', { read: ViewContainerRef })
    private componentContainer: ViewContainerRef;

    @Input()
    private content: Content;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnChanges() {
        this.componentContainer.clear();

        if (this.content) {
            let component = entryComponents
                .find(c => c.name === `${this.content.template}Component`);
            if (component) {
                let factory = this.componentFactoryResolver
                    .resolveComponentFactory(component);
                this.componentContainer.createComponent(factory);
            }
        }
    }
}
