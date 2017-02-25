import { Pipe, PipeTransform } from '@angular/core';

import * as marked from 'marked';

/**
 * Converts Markdown to HTML.
 *
 * @export
 * @class MdPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'md' })
export class MdPipe implements PipeTransform {
    transform(value: string): string {
        return marked.parse(value);
    }
}
