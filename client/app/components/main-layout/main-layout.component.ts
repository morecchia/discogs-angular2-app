import { Component, Input } from '@angular/core';

import { DiscogsUser } from '../../models';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent {
    @Input()
    user: DiscogsUser;

    @Input()
    videoSelected: boolean;

    title = 'Discogs Player';

}
