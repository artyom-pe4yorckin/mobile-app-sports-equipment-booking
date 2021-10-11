import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';

import { nativeStorageService } from '../../services/native-storage.service';

import { openingHours } from '../../app/app.module';
import { Product } from '../product-list/product-list';
import { showAlert } from '../../app/app.module';

@Component({
  selector: 'page-booking-form',
  templateUrl: 'booking-form.html'
})
export class BookingFormPage {
  product: Product;
  sum: number;
  bookingTerm: number;
  date: string;
  openingHoursArr: number[];
  availableHours: number[];
  openingHourObj: {
    value: number,
    checked: boolean
  }[];

  constructor(public navParams: NavParams,
              public alertCtrl: AlertController,
              private nsService: nativeStorageService) {
    this.product = navParams.get('bookingProduct');
    this.date = navParams.get('bookingDate');
    this.availableHours = navParams.get('hours');//доступные для бронирования часы
    this.bookingTerm = 0;
    this.sum = this.bookingTerm * +this.product.price;
    //часы работы-1, т.к. послежний час работы это закрытие
    this.openingHoursArr = Array(openingHours.to - openingHours.from).fill(openingHours.from).map((v, i) => v + i);//все
                                                                                                                   // часы
    this.openingHourObj = this.checkboxObj(this.openingHoursArr);//привязка всех часов к чекбоксам
    this.alertCtrl = alertCtrl;
  }

  /**
   * Создёт объект с часами, привязанными к чекбоксам
   * @param {number[]} arr
   * @returns {any[]}
   */
  checkboxObj(arr: number[]): CheckboxObj[] {
    let obj = [];
    for (let hour of arr) {
      obj.push({value: hour, checked: false});
    }
    return obj;
  }

  /**
   * расчёт суммы аренды
   */
  getCost(): void {
    let selectedHours = this.openingHourObj.filter(val => val.checked);
    this.bookingTerm = selectedHours.length;
    this.sum = this.bookingTerm * +this.product.price;
  }

  /**
   * проверка на доступность выбранных часов
   * @returns {boolean}
   */
  doBooking(): void {
    this.nsService.nativeStorage.getItem('bookings').then(
      data => {
        //часы с бронью на этот день
        let currentDayHours = data.filter(val => val.booking.day == this.date).map(val => val.booking.hours).flat();
        //выбранные часы
        let selectedHours = this.openingHourObj.filter(val => val.checked).map(val => val.value);
        for (let hour of selectedHours) {
          if (currentDayHours.includes(hour)) {
            showAlert(this.alertCtrl, `${hour} часов занято`);
            return;
          }
        }
        //в параметре передаём массив с бронированиями чтобы добавить в него новое
        this.addToBookingList(data);
      },
      error => {
        //если бронирований нет то передаём пустой массив с бронированиями
        this.addToBookingList([]);
      }
    );
  }

  /**
   * внести в список брони
   * @param {Booking[]} bookings
   */
  addToBookingList(bookings: (Booking | undefined)[]): void {
    this.nsService.nativeStorage.getItem('bookings').then(
      data => {
        let productIndex = data.map(val => val.product).indexOf(this.product.title);
        let selectedHours = this.openingHourObj.filter(val => val.checked).map(val => val.value)
        if(productIndex!=-1){
          data[productIndex].booking.hours = data[productIndex].booking.hours.concat(selectedHours)
        }else {
          let newBooking: Booking = {
            product: this.product.title,
            booking: {
              day: this.date,
              hours: this.openingHourObj.filter(val => val.checked).map(val => val.value)
            },
            cost: this.sum
          };
          data.push(newBooking);
        }
        this.nsService.nativeStorage.setItem('bookings', data).then(
          () => showAlert(this.alertCtrl, 'Товар успешно забронирован'),
          (error) => showAlert(this.alertCtrl, `Не удалось забронировать товар. ${error}`)
        );
      },
      (error) => {
        showAlert(this.alertCtrl, `Не удалось забронировать товар, ${error}`)
      }
    );
  }

}

export interface Booking {
  product: string,
  booking: {
    day: string,
    hours: number[]
  },
  cost: number,
}

interface CheckboxObj {
  value: number,
  checked: boolean
}
