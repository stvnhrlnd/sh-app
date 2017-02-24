import { Pipe, PipeTransform } from '@angular/core';

import * as marked from 'marked';

/**
 *
 *
 * @export
 * @class MdPipe
 * @implements {PipeTransform}
 */
@Pipe({ name: 'md' })
export class MdPipe implements PipeTransform {
    /**
     *
     *
     * @param {string} value
     * @returns {string}
     *
     * @memberof MdPipe
     */
    transform(value: string): string {
        return marked.parse(value);
    }
}
