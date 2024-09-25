import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() redirect: EventEmitter<Set<number>> = new EventEmitter();
  filterForm!: FormGroup;
  mymap: Map<string, number> = new Map();

  constructor(private fb: FormBuilder) {
    this.mymap.set('electronics', 1);
    this.mymap.set('jewelery', 2);
    this.mymap.set('mensClothing', 3);
    this.mymap.set('womenClothing', 4);
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      electronics: [false],
      jewelery: [false],
      mensClothing: [false],
      womenClothing: [false],
    });

    this.filterForm.valueChanges.subscribe((val) => {
      this.updateFilteredData(val);
    });
  }

  updateFilteredData(selectedFilters: any) {
    const newFilteredData = new Set<number>();

    Object.keys(selectedFilters).forEach((key) => {
      const filterId = this.mymap.get(key);
      if (selectedFilters[key]) {
        newFilteredData.add(filterId!);
      }
    });

    this.redirect.emit(newFilteredData);
  }
}
