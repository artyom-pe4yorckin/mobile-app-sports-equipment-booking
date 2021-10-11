import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';

import { nativeStorageService } from '../../services/native-storage.service';

import { Booking } from '../booking-form/booking-form';
import { showAlert } from '../../app/app.module';

@Component({
  selector: 'page-booking-list',
  templateUrl: 'booking-list.html'
})
export class BookingListPage {
  bookingList: Booking[];

  constructor(public alertCtrl: AlertController, private nsService:nativeStorageService) {
    nsService.nativeStorage.getItem('bookings').then(
      data => {
        this.bookingList = data;
      },
      () => {
        this.bookingList = [];
      }
    );
    this.alertCtrl = alertCtrl;
  }

  /**
   * Удаление бронирования
   * @param {Booking} product
   */
  deleteBooking(product: Booking): void {
    this.bookingList.splice(this.bookingList.indexOf(product), 1);
    this.nsService.nativeStorage.setItem('bookings', this.bookingList).then(
      () => showAlert(this.alertCtrl, 'Бронирование удалено'),
      (error) => showAlert(this.alertCtrl, `Не удалось удалить бронирование. ${error}`)
    );
  }

}
