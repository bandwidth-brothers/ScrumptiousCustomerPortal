import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public visibility: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }

  show() {
    this.visibility.next(true);
  }

  hide() {
    this.visibility.next(false);
  }
}
