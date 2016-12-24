import { Injectable } from '@angular/core';

@Injectable()
export class WindowRef {
   get globals(): any {
      return window;
   }
}
