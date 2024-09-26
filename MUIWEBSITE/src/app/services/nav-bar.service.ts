import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  private messageSource = new BehaviorSubject<boolean>(false);
  isTable$ = this.messageSource.asObservable();
  constructor() {}

  changeMessage(sign: boolean) {
    this.messageSource.next(sign);
  }
}
