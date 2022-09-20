import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CatalogDisplayService } from '../catalog-display/catalog-display.service';
import { SearchBarService } from './search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(
    public http: HttpClient, 
    public searchBarService: SearchBarService, 
    public catalogDisplayService: CatalogDisplayService 
    ) { }

  ngOnInit(): void {
  }
  searchInput: FormControl = new FormControl(null); 
  dropDownOption: FormControl = new FormControl(null); 
 
  search(){
     let keyword: any = this.searchInput.value;
     this.searchBarService.searchByItemName(keyword).subscribe((res:any) => {
      this.catalogDisplayService.catalogResults = [res];
     })
  }

  searchById(){
    this.searchInput= new FormControl(null); 
    let id: any = this.dropDownOption.value;
    if (id !== 'all') {
      this.searchBarService.searchByCatalogId(id).subscribe((res:any) => {
      this.catalogDisplayService.catalogResults = res;
      })
    } else {
      this.catalogDisplayService.catalogResults = this.catalogDisplayService.catalogResultsInit
    }

 }
}