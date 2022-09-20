import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  baseurl = 'http://localhost:8080/catalog/';
  catalogResults: any;

  constructor(public http: HttpClient) { }

  searchByItemName(itemName: any) {
    return this.http.get(`${this.baseurl}itemName/${itemName}`)
  }


  searchByCatalogId(catalogId: number){
    return this.http.get(`${this.baseurl}catalogDetails/${catalogId}`)
  }
}


