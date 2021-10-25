import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Restaurant } from 'src/app/entities/restaurant';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnChanges {

  @Input() restaurant!: Restaurant;
  open!: Date;
  close!: Date;
  asap!: Date;
  @Output() requestedDeliveryTime: EventEmitter<Date> = new EventEmitter();
  todayTimes: Date[] = [];
  tomorrowTimes: Date[] = [];
  selectedTime: Date | undefined;

  constructor() {

  }

  ngOnChanges(): void {
    this.todayTimes = [];
    this.tomorrowTimes = [];
    this.getTimes();
    this.selectedTime = this.todayTimes[0];
    this.requestedDeliveryTime.emit(this.todayTimes[0]);
  }

  async onRequestedDeliveryTimeChange(requestedDeliveryTime: Date) {
    this.requestedDeliveryTime.emit(requestedDeliveryTime);
  }

  async getTimes() {
    this.open = new Date();
    this.open.setHours(parseInt(this.restaurant.openingTime.substring(0, 2)));
    this.open.setMinutes(parseInt(this.restaurant.openingTime.substring(3, 5)));
    this.open.setSeconds(0);

    this.close = new Date();
    this.close.setHours(parseInt(this.restaurant.closingTime.substring(0, 2)));
    this.close.setMinutes(parseInt(this.restaurant.closingTime.substring(3, 5)));
    this.open.setSeconds(0);

    this.asap = new Date();
    this.asap.setHours(this.asap.getHours() + 1);
    this.asap.setMinutes(this.asap.getMinutes() + 15);
    if (this.asap.getMinutes() > 45) {
      this.asap.setMinutes(45);
    } else if (this.asap.getMinutes() > 30) {
      this.asap.setMinutes(30);
    } else if (this.asap.getMinutes() > 15) {
      this.asap.setMinutes(15);
    } else {
      this.asap.setMinutes(0);
    }
    this.asap.setSeconds(0);


    var currentTime = this.asap;
    while (currentTime.getTime() - this.close.getTime() < 0) {
      this.todayTimes.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }

    this.open.setDate(this.open.getDate() + 1);
    this.close.setDate(this.close.getDate() + 1);
    currentTime = this.open;
    while (currentTime.getTime() - this.close.getTime() < 0) {
      this.tomorrowTimes.push(new Date(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
  }

}
