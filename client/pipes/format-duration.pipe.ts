import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const span = moment.duration(value);
    const spanSeconds = span.seconds();
    const seconds = spanSeconds < 10 ? `0${spanSeconds}` : spanSeconds;

    return `${span.minutes()}:${seconds}`;
  }
}
