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
      return values[0].name;
    }

    let output = '';
    values.forEach(item => {
      output += `${item.name} ${item.join || ''} `;
    });

    return output.trim();
  }
}
