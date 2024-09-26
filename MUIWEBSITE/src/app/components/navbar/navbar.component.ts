import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  flag: boolean = false;
  inputValue: boolean;
  constructor(private data: NavBarService) {
    this.inputValue = false;
  }
  ngOnInit() {}
  newMessage(event: any) {
    this.inputValue = !this.inputValue;
    console.log(this.inputValue);
    this.data.changeMessage(this.inputValue);
  }
}
