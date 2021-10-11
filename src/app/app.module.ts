import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { CardComponent } from '../components/card/card';
import { nativeStorageService } from '../services/native-storage.service';

import { BookingFormPage } from '../pages/booking-form/booking-form';
import { BookingListPage } from '../pages/booking-list/booking-list';
import { ContactsPage } from '../pages/contacts/contacts';
import { ProductListPage } from '../pages/product-list/product-list';
import { ProductDetailsPage } from '../pages/product-details/product-details';

@NgModule({
  //страницы и компоненты нужно добавить сюда
  declarations: [
    MyApp,
    ProductListPage,
    ProductDetailsPage,
    BookingFormPage,
    BookingListPage,
    ContactsPage,
    CardComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
      ],
      monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayShortNames: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    }),
    FormsModule
  ],
  bootstrap: [IonicApp],
  //страницы и компоненты добавить сюда тоже
  entryComponents: [
    MyApp,
    ProductListPage,
    ProductDetailsPage,
    BookingFormPage,
    BookingListPage,
    ContactsPage,
    CardComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NativeStorage,
    nativeStorageService
  ]
})
export class AppModule {

}

export const openingHours: {from: number, to: number} = {from: 9, to: 20};

/**
 * Показывает попап с текстом
 * @param {string} text
 */
export function showAlert(alertCtrl, text: string): void {
  const alert = alertCtrl.create({
    title: text,
    buttons: ['OK']
  });
  alert.present();
}
