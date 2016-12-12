import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Input()
  placeholder: string = 'Search';
  text = 'Nothing';
  constructor() { }

  clear(input) {
    input.value = '';
  }

  ngOnInit() {
  }

}
