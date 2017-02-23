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
  onImagesClose = new EventEmitter<boolean>()

  imageIndex = 0;

  showingImageUrl: string;

  closeImages() {
    this.onImagesClose.emit(false);
  }

  ngOnInit() {
    this.showingImageUrl = this.images[0].uri;
  }

  nextImage() {
    if (this.imageIndex < this.images.length - 1) {
      this.imageIndex = this.imageIndex + 1;
      this.showingImageUrl = this.images[this.imageIndex].uri;
    }
  }

  prevImage() {
    if (this.imageIndex > 0) {
      this.imageIndex = this.imageIndex - 1;
      this.showingImageUrl = this.images[this.imageIndex].uri;
    }
  }
}
