import { Component, OnInit } from '@angular/core';
import { PostsStore } from './card.store';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [PostsStore],
})
export class CardComponent implements OnInit {
  // cards: any;
  // arrayVal$!: Observable<any>;
  // error$!: Observable<boolean>;
  // process$!: Observable<boolean>;

  vm$ = this.postStore.vm$;
  constructor(private postStore: PostsStore) {
    this.postStore.getPosts();
    console.log('HELLO CONSOLE LOG');
  }
  ngOnInit() {
    console.log('HELLO CONSOLE LOGGING');
  }
}
