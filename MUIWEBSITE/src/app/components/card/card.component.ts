import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadProducts } from 'src/app/store/root.action';
import { selectArrayValue } from 'src/app/store/root.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges {
  cards$: any;
  cards: any[] = [];
  filteredCards: any[] = [];
  mymap: Map<string, number> = new Map();
  @Input() parentData!: Set<number>;

  constructor(private store: Store<any>) {
    this.cards$ = this.store.pipe(select(selectArrayValue));
    this.mymap.set('electronics', 1);
    this.mymap.set('jewelery', 2);
    this.mymap.set("men's clothing", 3);
    this.mymap.set("women's clothing", 4);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());

    this.cards$.subscribe((res: any) => {
      this.cards = res.map((el: any) => ({
        ...el,
        id: Number(this.mymap.get(el.category)),
      }));

      this.filterCards();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parentData'] && !changes['parentData'].firstChange) {
      this.filterCards();
    }
  }

  filterCards() {
    if (this.parentData && this.parentData.size > 0) {
      this.filteredCards = this.cards.filter((card: any) =>
        this.parentData.has(card.id)
      );
    } else {
      this.filteredCards = this.cards;
    }
    console.log(this.filteredCards);
  }
}
