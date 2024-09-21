import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  filterForm!: FormGroup;
  showFiller: boolean = false;
  mymap: Map<string, number> = new Map();
  filteredData = new Set();

  constructor(private fb: FormBuilder, private store: Store<any>) {
    this.mymap.set('electronics', 1);
    this.mymap.set('jewelery', 2);
    this.mymap.set('mensClothing', 3);
    this.mymap.set('womenClothing', 4);
    this.filteredData;
  }
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      electronics: [false],
      jewelery: [false],
      mensClothing: [false],
      womenClothing: [false],
    });

    this.filterForm.valueChanges.subscribe((selectedFilters) => {
      console.log(selectedFilters);
      Object.keys(selectedFilters).forEach((key) => {
        let a = Number(this.mymap.get(key));
        if (selectedFilters[key]) {
          console.log(1333, key);
          this.filteredData.add(a);
        } else if (!selectedFilters[key]) {
          this.filteredData.delete(a);
        }
      });
      console.log('Data', this.filteredData);
    });
  }
}
