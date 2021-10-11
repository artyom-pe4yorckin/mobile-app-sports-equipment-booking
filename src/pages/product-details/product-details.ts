import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

import { openingHours } from '../../app/app.module';
import { Product } from '../product-list/product-list';
import { showAlert } from '../../app/app.module';

import { Booking, BookingFormPage } from '../booking-form/booking-form';
import { nativeStorageService } from '../../services/native-storage.service';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
  product: Product;
  productType: string;
  productSeason: string[];
  minDate: string;
  bookingDate: string;
  availableHours: number[];
  bookingList: Booking[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private nsService: nativeStorageService) {
    this.productType = navParams.get('productType');//получаем переданные на страницу данные
    this.productSeason = navParams.get('productSeason');
    this.product = navParams.get('currentProduct');
    this.minDate = this.getDate();
    this.bookingDate = '';//введённая дата
    //часы работы - 1, т.к. в последний час работы закрытие
    this.availableHours = Array(openingHours.to - openingHours.from).fill(openingHours.from).map((v, i) => +v + i);
    this.alertCtrl = alertCtrl;
    nsService.nativeStorage.getItem('bookings').then(
      data => {
        this.bookingList = data;
      },
      (err) => {
        this.bookingList = [];
      }
    );
  }

  /**
   возвращает дату в иониковском формате (ISO 8601)
   @returns {string}
   */
  getDate(): string {
    let now = new Date();
    let month = '0' + (now.getMonth() + 1);
    let day = '0' + now.getDate();
    return `${now.getFullYear()}-${month.slice(-2)}-${day.slice(-2)}`;
  }

  /**
   * Проверяет, свободна ли введённая дата
   */
  validateBookingDate(): void {
    //Если в этот день уже есть бронирования то проверить есть ли свободные часы
    //массив забронированных в этот день часов для выбранного товара
    let bookingHours = this.bookingList.filter(val =>
      val.product == this.product.title
      &&
      this.bookingDate == val.booking.day)[0].booking.hours;
    //удаляем из доступных часов забронированные часы
    for (let hour of bookingHours) {
      this.availableHours.splice(this.availableHours.indexOf(hour), 1);
    }
    if (this.availableHours.length == 0) {
      this.bookingDate = '';
      showAlert(this.alertCtrl, 'В этот день нет доступных для бронирования часов');
    }
  }

  /**
   *открывает страницу с формой бронирования
   * @param {Product} product
   */
  openBooking(product: Product): void {
    this.navCtrl.push(BookingFormPage, {
      bookingProduct: product,
      bookingDate: this.bookingDate,
      hours: this.availableHours
    });
  }
}
