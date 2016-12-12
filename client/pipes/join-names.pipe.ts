import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinNames'
})
export class JoinNamesPipe implements PipeTransform {
  transform(value: any, join = ', '): string {
    if (!value) {
      return '';
    }

    return value
      .map(item => item.name)
      .join(join);
  }
}
