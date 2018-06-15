export class Login {
  constructor() {
    this.email = '';
    this.password = ''
  }

  login() {
    new Windows.UI.Popups.MessageDialog(`You Just Logged in using ${this.password}`, `Hi ${this.email}`)
      .showAsync();
  }

  reset() {
    this.email = '';
    this.password = ''
  }
}
