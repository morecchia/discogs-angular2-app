import { Component, Input } from '@angular/core';
import { DiscogsListing } from '../../models';

@Component({
  selector: 'app-sales-preview',
  templateUrl: './sales-preview.component.html'
})
export class SalesPreviewComponent {
  @Input() listing: DiscogsListing;
}
