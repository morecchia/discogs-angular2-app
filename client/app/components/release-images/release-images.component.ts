import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-release-images',
  templateUrl: './release-images.component.html',
  styleUrls: ['./release-images.component.css']
})
export class ReleaseImagesComponent implements OnInit {
  @Input()
  images: any;

  @Input()
  imagesVisible = false;

  @Output()
  onImagesClose = new EventEmitter<boolean>();

  imageIndex = 0;

  get navButtonDisabled() { return this.images.length <= 1; }

  setMainClasses() {
    return {
      'visible': this.imagesVisible,
      'fadeIn': this.imagesVisible,
      'release-images': true
    };
  }

  nextImage() {
    this.imageIndex = this.imageIndex < this.images.length - 1
      ? this.imageIndex = this.imageIndex + 1 : 0;
  }

  prevImage() {
    this.imageIndex = this.imageIndex > 0
      ? this.imageIndex = this.imageIndex - 1 : this.images.length - 1;
  }

  ngOnInit() {
    this.imageIndex = 0;
  }
}
