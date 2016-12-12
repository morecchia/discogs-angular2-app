import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  items: any[];
  constructor() { }

  ngOnInit() {
    this.items = [
      { text: 'Wants', link: '/wants' },
      { text: 'Collection', link: '/collection' },
      { text: 'Sales', link: '/sales' }
    ];
  }

}
