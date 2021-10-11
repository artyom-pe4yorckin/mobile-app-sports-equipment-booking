import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BookingListPage } from '../pages/booking-list/booking-list';
import { ContactsPage } from '../pages/contacts/contacts';
import { ProductListPage } from '../pages/product-list/product-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // задать кроневую страницу
  rootPage = ProductListPage;
  burgerMenuPages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // Страницы бургер меню
    this.burgerMenuPages = [
      {title: 'Инвентарь', component: ProductListPage},
      {title: 'Бронирования', component: BookingListPage},
      {title: 'Контакты', component: ContactsPage}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // закрыть бургер меню
    this.menu.close();
    // перейти на новую страницу
    this.nav.setRoot(page.component);
  }
}
