import { Component, OnInit } from '@angular/core';
import { DiscogsService } from '../../services/discogs.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  listings: any[];
  currentPage: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 25;

  constructor(private discogs: DiscogsService) { }

  getInventory(page: number = 1): void {
    this.discogs.getInventory()
      .subscribe(response => {
        this.listings = response.json().listings;
      });
  }

  ngOnInit() {
    this.getInventory();
  }
}
