import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  filterForm!: FormGroup;
  showFiller: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      option1: [false],
      option2: [false],
      option3: [false],
      option4: [false],
    });

    this.filterForm.valueChanges.subscribe((selectedFilters) => {
      console.log('Selected filters:', selectedFilters);
    });
  }
}
