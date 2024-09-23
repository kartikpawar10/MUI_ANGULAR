import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { loadProducts } from 'src/app/store/root.action';
import {
  selectArrayValue,
  selectFilterDataArrayValue,
} from 'src/app/store/root.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cards$: Observable<any>;
  filterdData$: Observable<any>;
  cards: any[] = [];
  cardsEmpty: any[] = [];
  savedSet: any;
  mymap: Map<string, number> = new Map();

  constructor(private store: Store<any>) {
    this.cards$ = this.store.pipe(select(selectArrayValue));
    this.filterdData$ = this.store.pipe(select(selectFilterDataArrayValue));
    this.mymap.set('electronics', 1);
    this.mymap.set('jewelery', 2);
    this.mymap.set("men's clothing", 3);
    this.mymap.set("women's clothing", 4);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    // Subscribe to the cards$ observable
    this.cards$.pipe().subscribe((res) => {
      if (Array.isArray(res)) {
        this.cards = res;
      } else {
        console.error('Cards data is not an array:', res);
      }
    });
    this.filterdData$.pipe().subscribe((data: any) => {
      this.savedSet = data;
      if (Array.isArray(this.cards)) {
        this.cards = this.cards.map((el: any) => {
          return {
            ...el,
            id: Number(this.mymap.get(el.category)),
          };
        });
        console.log('Updated ::', this.cards);
      } else {
        console.error('Cards is not an array:', this.cards);
      }

      if (Array.isArray(this.cards)) {
        this.cards = this.cards.filter((el: any) => {
          return this.savedSet.has(el.id);
        });
        console.log('Updated ::', this.cards);
      } else {
        console.error('Cards is not an array:', this.cards);
      }
    });
  }
}
