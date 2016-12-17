import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'embed'
})
export class EmbedPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: any): any {
    if (!value) {
      return '';
    }
    return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}
