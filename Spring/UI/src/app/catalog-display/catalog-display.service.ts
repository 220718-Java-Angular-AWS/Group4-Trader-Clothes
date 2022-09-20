import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CatalogDisplayService {

  baseurl = 'http://localhost:8080/catalog/';
  catalogResultsInit: any;
  catalogResults: any;

  constructor(public http: HttpClient) { }

  getAllCatalogItems() {
    return this.http.get(`${this.baseurl}`)
  }
}
