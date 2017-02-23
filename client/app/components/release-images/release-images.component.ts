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

  showingImageUrl: string;

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
    this.showingImageUrl = this.images[this.imageIndex].uri;
  }

  prevImage() {
    this.imageIndex = this.imageIndex > 0
      ? this.imageIndex = this.imageIndex - 1 : this.images.length - 1;

    this.showingImageUrl = this.images[this.imageIndex].uri;
  }

  ngOnInit() {
    this.showingImageUrl = this.images[0].uri;
  }
}
