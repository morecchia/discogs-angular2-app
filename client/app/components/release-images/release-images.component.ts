import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { DiscogsImage } from '../../models';

@Component({
  selector: 'app-release-images',
  templateUrl: './release-images.component.html'
})
export class ReleaseImagesComponent implements OnChanges {
  @Input()
  images: DiscogsImage[];

  @Input()
  imagesVisible = false;

  @Output()
  onImagesClose = new EventEmitter<boolean>();

  imageIndex = 0;

  get navButtonDisabled() { return this.images && this.images.length <= 1; }

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

  ngOnChanges() {
    this.imageIndex = 0;
  }
}
