import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterServiceService {
  constructor(private http: HttpClient) {}
  getFilteredData(categoryName: string): Observable<any> {
    return this.http.get(
      `https://fakestoreapi.com/products/category/${categoryName}`
    );
  }
}
