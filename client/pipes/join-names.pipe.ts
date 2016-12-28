import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNames'
})
export class JoinNamesPipe implements PipeTransform {
  transform(values: any): string {
    if (!values) {
      return '';
    }

    if (values.length && values.length === 1) {
      return values[0].name || values[0];
    }

    return values.map(v => v.name || v)
      .join(` ${values[0].join || ''} `)
      .trim();
  }
}
