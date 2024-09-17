import { Component } from '@angular/core';
import { CardServiceService } from '../services/card-service.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  constructor(private cardService: CardServiceService) {}
  cards: any;
  ngOnInit(): void {
    this.cardService.getData().subscribe((data) => {
      console.log(data);
      this.cards = data;
    }),
      (error: any) => console.log(error);
  }
}
