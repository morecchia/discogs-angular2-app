import { Pipe, PipeTransform } from '@angular/core';

import { formatDuration } from '../services/youtube.service';

import * as moment from 'moment';

@Pipe({
  name: 'formatDuration'
})
export class FormatDurationPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    return formatDuration(moment.duration(value));
  }
}
