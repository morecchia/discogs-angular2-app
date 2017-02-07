import { NgModule } from '@angular/core';

import { ActiveMembersPipe } from './active-members.pipe';
import { JoinNamesPipe } from './join-names.pipe';
import { FormatDurationPipe } from './format-duration.pipe';
import { EmbedPipe } from './embed.pipe';

export const PIPES = [
  ActiveMembersPipe,
  JoinNamesPipe,
  FormatDurationPipe,
  EmbedPipe
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
