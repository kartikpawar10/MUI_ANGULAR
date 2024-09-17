import { Component } from '@angular/core';
import { CardServiceService } from '../services/card-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  THUMBUP_ICON =
    `<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.` +
    `44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5` +
    `1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
  </svg>`;

  constructor(private cardService: CardServiceService) {}
  cards: any;
  cardServiceObservable$: Observable<any> | undefined;
  ngOnInit(): void {
    this.cardService.getData().subscribe((data) => {
      console.log(data);
      this.cards = data;
    }),
      (error: any) => console.log(error);
  }
  ngOnDestroy(): void {}
}
