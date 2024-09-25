import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  parentData!: Set<number>;

  handleRedirect($event: Set<number>) {
    this.parentData = $event;
  }
}
