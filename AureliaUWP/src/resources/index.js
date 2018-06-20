import { PLATFORM } from 'aurelia-framework'

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName('./uwp-media-toolbar/uwp-media-toolbar')
  ]);
}
