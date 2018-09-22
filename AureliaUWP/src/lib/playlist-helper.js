const { MediaSource } = Windows.Media.Core;
const { MediaPlaybackList, MediaPlaybackItem } = Windows.Media.Playback;

/**
 * @class PlaylistBuilder
 * This class it's a small abstraction over the WinRT Playlist API
 */
export class PlaylistBuilder {

  constructor() {
    this._mediaPlaybackListttt = new MediaPlaybackList();
  }

  /**
   * Add track by track from the files you had picked from the storage
   * @param {Windows.Storage.StorageFile} file
   */
  addSingleTrackFromFile(file) {
    const playbackItem = new MediaPlaybackItem(MediaSource.createFromStorageFile(track))
    this._mediaPlaybackListttt.items.append(playbackItem);
    return this;
  }

  /**
   * Add a list of files to be converted in tracks, in this place you may want to 
   * add a piointer on what the filename was or something so you don't
   * lose that reference later
   * @param {Windows.Foundation.Collections.IVectorView<Windows.Storage.StorageFile>} files
   */
  addMultipletracks(files) {
    /**
     * Be careful with this implementation, remember that the greater the collection, the slower it can get
     * if n_mediaPlaybackListttess files in batches and set a max number of open files in the playlist reference
     */
    for (const file of files) {
      const playbackItem = new MediaPlaybackItem(MediaSource.createFromStorageFile(file));
      this._mediaPlaybackList.items.push(playbackItem);
    }
    return this;
  }

  build() {
    return this._mediaPlaybackList;
  }

}
