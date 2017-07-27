import { Component, Input, Output, EventEmitter } from '@angular/core';

import { UuidService } from 'angular2-uuid';

import { YoutubeVideo, Playlist, PlaylistAdd } from '../../models';

@Component({
  selector: 'app-add-playlist-menu',
  templateUrl: './add-playlist-menu.component.html'
})
export class AddPlaylistMenuComponent {
  @Input()
  videos: YoutubeVideo[];

  @Input()
  playlists: Playlist[];

  @Input()
  type: string;

  @Output()
  onVideoQueued = new EventEmitter<PlaylistAdd>();

  @Output()
  onQueueAll = new EventEmitter<string>();

  @Output()
  onPlaylistAdd = new EventEmitter<Playlist>();

  addingNew = false;
  playlistName: string;

  queueVideos(id: string, dialog?: any) {
    if (dialog) {
      dialog.close();
    }

    return this.type === 'video'
      ? this.onVideoQueued.emit({ videos: this.videos, id })
      : this.onQueueAll.emit(id);
  }

  addPlaylist(dialog: any) {
    if (!this.playlistName) {
      return;
    }

    const id = this.uuid.generate();

    this.onPlaylistAdd.emit({
      name: this.playlistName,
      count: 1,
      id: id,
      videos: []
    });

    this.queueVideos(id);
    dialog.close();
  }

  toggleAddPlaylist() {
    this.addingNew = !this.addingNew;
  }

  onDialogHide() {
    this.playlistName = '';
  }

  constructor(private uuid: UuidService) { }
}
