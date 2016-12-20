import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

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

  constructor(private discogs: DiscogsService, private localStorage: LocalStorageService) { }

  getInventory(page = 1): void {
    if (page) {
      this.localStorage.set('salesPage', page);
    }

    this.listings = [];
    this.discogs.getInventory(page)
      .subscribe(response => {
        this.listings = response.json().listings;
      });
  }

  ngOnInit() {
    const activePage = this.localStorage.get('salesPage') as number;
    this.getInventory(activePage);
  }
}
