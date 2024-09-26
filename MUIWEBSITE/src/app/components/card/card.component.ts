import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';
import { NavBarService } from 'src/app/services/nav-bar.service';
import { loadProducts } from 'src/app/store/root.action';
import { selectArrayValue } from 'src/app/store/root.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit, OnChanges, AfterViewInit {
  cards$: any;
  cards: any[] = [];
  filteredCards: any[] = [];
  displayedColumns: string[] = ['category', 'description', 'price', 'id'];
  mymap: Map<string, number> = new Map();
  inputData: boolean;
  val: number = 0;
  @Input() parentData!: Set<number>;
  dataSource = new MatTableDataSource<ProductType>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private store: Store<any>, private data: NavBarService) {
    this.cards$ = this.store.pipe(select(selectArrayValue));
    this.inputData = false;
    this.mymap.set('electronics', 1);
    this.mymap.set('jewelery', 2);
    this.mymap.set("men's clothing", 3);
    this.mymap.set("women's clothing", 4);
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
    this.data.isTable$.subscribe((mes) => {
      this.inputData = mes;
    });
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

    this.dataSource.data = this.filteredCards;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface ProductType {
  category: string;
  description: string;
  price: number;
  id: number;
}
