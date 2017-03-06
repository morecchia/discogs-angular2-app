import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxTextLength'
})
export class MaxTextLengthPipe implements PipeTransform {
  transform(value: string, length: number): string {
    return value.length > length
      ? `${value.substring(0, length)}...`
      : value;
  }
}
