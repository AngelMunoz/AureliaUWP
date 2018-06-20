import { computedFrom } from 'aurelia-framework';
import { PickerBuilder } from '../../lib/file-picker';
import { PlaylistBuilder } from '../../lib/playlist-helper';
const { MediaPlayer } = Windows.Media.Playback;


/**
 * @class UwpMediaToolbar
 * An Aurelia Custom Component, this is just to showcase that you can do native stuff
 * inside windows without electron and yet using javascript
 * (normally we would use this component at top level in the application)
 */
export class UwpMediaToolbar {

  constructor() {
    this.isPlaying = false;
    this.readyToPlay = false;
    /**
     * @type {Windows.Media.Playback.MediaPlaylist}
     */
    this.mediaPlaylist = null;
    this.currentTrack = null;
    
    this.picker = new PickerBuilder();
    this.playlistBuilder = new PlaylistBuilder();
    
    /**
     * @type {Windows.Media.Playback.MediaPlayer}
     */
    this.mediaPlayer = new MediaPlayer();

  }

  play() {
    // chec that we have anything to play at all
    if (!this.mediaPlayer.source || this.mediaPlaylist.items.length <= 0) { return; }
    this.mediaPlayer.play();
    this.isPlaying = true;
  }

  pause() {
    // why pause if you can't pause?
    if (!this.mediaPlayer.canPause) { return; }
    this.mediaPlayer.pause();
    this.isPlaying = false;
  }

  previous() {
    this.mediaPlaylist.movePrevious();
  }

  next() {
    this.mediaPlaylist.moveNext();
  }

  toggleAutoRepeat() {
    this.mediaPlaylist.autoRepeatEnabled = !this.mediaPlaylist.autoRepeatEnabled;
  }

  toggleShuffle() {
    this.mediaPlaylist.shuffleEnabled = !this.mediaPlaylist.shuffleEnabled;
  }

  /**
   * Fired when the Item changes in the MediaPlaylist
   * @param {Windows.Media.Playback.CurrentMediaPlaybackItemChangedEventArgs} event 
   */
  onItemChanged(event) {
    console.log(event)
  }

  /**
   * Here we use our helpers defined in the 'lib' dir
   */
  async onSelectFiles() {
    this.readyToPlay = false;
    try {
      // select the files
      this.files = await this.picker.pick(true);
      if (this.files.length <= 0) { return; }
    } catch (e) {
      console.error(e);
      this.readyToPlay = false;
    }
    // build the playlist
    this.mediaPlaylist = this.playlistBuilder.addMultipletracks(this.files).build();
    this.mediaPlaylist.addEventListener('currentitemchanged', this.onItemChanged.bind(this));
    // assign the playlist to the media player
    this.mediaPlayer.source = this.mediaPlaylist;
    this.readyToPlay = true
  }

  @computedFrom('mediaPlaylist.autoRepeatEnabled')
  get autorepeat() {
    return this.mediaPlaylist ? this.mediaPlaylist.autoRepeatEnabled : false;
  }

  @computedFrom('mediaPlaylist.shuffleEnabled')
  get shuffle() {
    return this.mediaPlaylist ? this.mediaPlaylist.shuffleEnabled : false;
  }

  @computedFrom('mediaPlayer.currentState')
  get playerstate() {
    return this.mediaPlayer ? this.mediaPlayer.currentState : -1;
  }

  /**
   * Initialize the picker when we launch the app
   */
  attached() {
    this.picker
      .addDefaultLocation(Windows.Storage.Pickers.PickerLocationId.musicLibrary)
      .addfileTypeFilter(['.mp3']);
  }

  /**
   * In case we detach the component, we need to remove event listeners and close the media player
   * we don't want to be leaking memory al over the place
   */
  detached() {
    this.mediaPlaylist.removeEventListener('currentitemchanged', this.onItemChanged.bind(this))
    this.mediaPlayer.close();
  }

}
