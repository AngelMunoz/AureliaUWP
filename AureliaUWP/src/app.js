import { PLATFORM, inject } from 'aurelia-framework'
import { EventAggregator } from "aurelia-event-aggregator";
import { Router } from 'aurelia-router';
import NProgress from "nprogress";


@inject(EventAggregator, Router)
export class App {


  /**
   * 
   * @param {EventAggregator} ea
   */
  constructor(ea, router) {
    this.ea = ea;
    this.isHamburgerActive = false;
    this.ea.subscribe('Loading:Start', () => {
      NProgress.start();
    });
    this.ea.subscribe('Loading:Finish', () => {
      NProgress.done();
    });

  }

  configureRouter(config, router) {
    this.router = router;
    config.map([
      { route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home/home'), title: 'Home', nav: false },
      { route: 'about', name: 'about', moduleId: PLATFORM.moduleName('./about/about'), title: 'About', nav: true },
      { route: 'login', name: 'login', moduleId: PLATFORM.moduleName('./auth/login'), title: 'Login', nav: false },
      { route: 'signup', name: 'signup', moduleId: PLATFORM.moduleName('./auth/signup'), title: 'Signup', nav: false }
    ]);
  }

  handleHamburger(value) {
    this.isHamburgerActive = !value;
  }

  activate(params, routeConfig, navigationInstruction) {
    this.ea.publish('Loading:Start');
  }

  attached() {
    this.ea.publish('Loading:Finish');
  }

  goHome() {
    this.router.navigate('/')
  }

  /**
   * We hav to use programatical navigation because anchors for some reason reload the page
   * whith the aurelia router on this web engine, weird!
   * @param {any} route
   */
  navigate(route) {
    if (typeof route === 'string') {
      return this.router.navigateToRoute(route)
    }
    return this.router.navigateToRoute(route.config.name);
  }

}
