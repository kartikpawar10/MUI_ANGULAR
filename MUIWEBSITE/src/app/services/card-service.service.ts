import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardServiceService {
  constructor(private http: HttpClient) {}
  getData(): Observable<any> {
    const apiUrl = 'https://fakestoreapi.com/products?limit=10';
    return this.http.get(apiUrl);
  }

  getDataWithSearchValue(category: string) {
    const apiUrl = `https://fakestoreapi.com/products/category/${category}?limit=10`;
  }
}
