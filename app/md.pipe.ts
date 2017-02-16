import { Pipe, PipeTransform } from '@angular/core';

import * as marked from 'marked';

@Pipe({ name: 'md' })
export class MdPipe implements PipeTransform {
    transform(value: string): string {
        return marked(value);
    }
}
