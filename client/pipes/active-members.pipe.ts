import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'activeMembers'
})
export class ActiveMembersPipe implements PipeTransform {
  transform(value: any): string {
    return value
      .filter(member => member.active)
      .map(member => member.name)
      .join(', ');
  }
}
