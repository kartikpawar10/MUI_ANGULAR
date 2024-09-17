import { Component } from '@angular/core';
import { CardServiceService } from '../services/card-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
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
