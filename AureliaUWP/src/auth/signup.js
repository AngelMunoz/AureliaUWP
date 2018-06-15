export class Signup {
  constructor() {
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }

  signup() {
    if (this.password !== this.repeatPassword) {
      this.showError = true
      return;
    }
    new Windows.UI.Popups.MessageDialog(`You Just Signed Up in using ${this.password}`, `Hi ${this.email}`)
      .showAsync();
    this.showError = false;
  }

  reset() {
    this.email = '';
    this.password = '';
    this.repeatPassword = '';
  }

  hideError() {
    this.showError = false;
  }
}
