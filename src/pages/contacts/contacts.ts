import { Component } from '@angular/core';
import {openingHours} from '../../app/app.module'

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  openingHours:{from: number, to: number}
  openNow:boolean
  currentHour:number
  constructor() {
    this.openingHours = openingHours
    this.currentHour = new Date().getHours()
    this.openNow = this.currentHour>=openingHours.from && this.currentHour<=openingHours.to
  }
}
