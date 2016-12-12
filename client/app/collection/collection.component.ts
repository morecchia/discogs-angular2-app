import { Component, OnInit } from '@angular/core';
import { DiscogsService } from '../../services/discogs.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  releases: any[];

  constructor(private discogs: DiscogsService) { }

  getCollection(): void {
    this.discogs.getCollection()
      .subscribe(response => {
        this.releases = response.json().releases;
      });
  }

  ngOnInit() {
    this.getCollection();
  }
}
