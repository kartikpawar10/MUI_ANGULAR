import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadFilteredDataSuccess } from 'src/app/store/root.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  filterForm!: FormGroup;
  filteredData = new Set();
  mymap: Map<string, number> = new Map();
  showFiller: boolean = false;

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
      this.getData(selectedFilters);
    });
  }

  getData(selectedFilters: any) {
    Object.keys(selectedFilters).forEach((key) => {
      let a = Number(this.mymap.get(key));
      if (selectedFilters[key]) {
        this.filteredData.add(a);
      } else if (!selectedFilters[key]) {
        this.filteredData.delete(a);
      }
    });
    this.store.dispatch(
      loadFilteredDataSuccess({ filterDataArray: this.filteredData })
    );
  }
}
