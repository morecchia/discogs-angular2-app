import { Component, OnInit, Input } from '@angular/core';
import { DiscogsUser } from '../../models';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.css']
})
export class LayoutHeaderComponent implements OnInit {
  @Input()
  user: DiscogsUser;

  // toggleSearch() {
  //   this.searchVisible = !this.searchVisible;
  // }

  ngOnInit() {
  }
}
