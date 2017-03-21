import { Injectable } from '@angular/core';

import { UUID } from 'angular2-uuid';

@Injectable()
export class UuidService {

  generate(): string {
    return UUID.UUID();
  }
}
