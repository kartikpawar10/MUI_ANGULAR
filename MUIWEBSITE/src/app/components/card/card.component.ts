import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { loadProducts } from 'src/app/store/root.action';
import { selectArrayValue } from 'src/app/store/root.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cards$: Observable<any>;
  cards: any;
  constructor(private store: Store<any>) {
    console.log('HELLO CONSOLE LOG');
    this.cards$ = this.store.pipe(select(selectArrayValue));
  }
  ngOnInit() {
    console.log('HELLO CONSOLE LOGGING');
    this.store.dispatch(loadProducts());
    this.cards$.pipe().subscribe((res) => {
      console.log({ res });
      this.cards = res;
    });
  }
}
