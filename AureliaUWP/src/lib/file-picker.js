const { FileOpenPicker, FolderPicker } = Windows.Storage.Pickers;


/**
 * @class FilePickerBuilder
 * perhaps an overkill perhaps not this class abstracts a little bit of
 * the WinRT API to pick a file
 */
export class PickerBuilder {

  /**
   * if you don't send the mode parameter it will be a file picker by default
   * @param {'file' | 'folder'} mode chose a file picker or a folder picker
   */
  constructor(mode = 'file') {
    this._mode = mode;
    this._picker = null;

    if (mode === 'folder') {
      this._picker = new FolderPicker();
    } else {
      this._picker = new FileOpenPicker();
    }
  }

  /**
   * The file Picker must use a file extension so it can filter files, this is a must, it can't be empty
   * or throws an error
   * @param {Windows.Foundation.Collections.IVector<string>} fileTypeFilter
   */
  addfileTypeFilter(fileTypeFilter = ['.txt']) {
    this._picker.fileTypeFilter.replaceAll(fileTypeFilter)
    return this;
  }

  /**
   * You can Suggest where to look for files, like the user's music library for example
   * @param {Windows.Storage.Pickers.PickerLocationId} suggestedStartLocation
   */
  addDefaultLocation(suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.musicLibrary) {
    this._picker.suggestedStartLocation = suggestedStartLocation;
    return this;
  }

  /**
   * if you need more options and you know the names of the options, add them, this feels a little unsafe to me
   * but who knows it's just a demo helper
   * @param { { [x:string]:any } } options
   */
  addExtraProps(options) {
    for (const option of options.keys()) {
      if (option in filePicker) {
        this._picker[option] = options[option];
      }
    }
    return this;
  }

  /**
   * so finally build the picker and get the files, or the file
   * @param {boolean} isMultiple chose between one file or multiple files
   */
  pick(isMultiple = false) {
    if (this.mode !== 'folder' && (!this._picker.fileTypeFilter || this._picker.fileTypeFilter.size <= 0)) {
      return Promise.reject(new Error('A file extension array must be provided'));
    }
    if (this.mode === 'folder') {
      return this._picker.pickSingleFolderAsync();
    }
    if (isMultiple) {
      return this._picker.pickMultipleFilesAsync();
    }
    return this._picker.pickSingleFileAsync();
  }

}
