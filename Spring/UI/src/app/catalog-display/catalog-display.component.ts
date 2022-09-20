import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../search-bar/search-bar.service';
import { CatalogDisplayService } from './catalog-display.service';


@Component({
  selector: 'app-catalog-display',
  templateUrl: './catalog-display.component.html',
  styleUrls: ['./catalog-display.component.css']
})
export class CatalogDisplayComponent implements OnInit {

  constructor(public searchBarService: SearchBarService, public catalogdisplayService: CatalogDisplayService) {
      this.getCatalog();
   }

  ngOnInit(): void {
  }

  getCatalog(){
    this.catalogdisplayService.getAllCatalogItems().subscribe((res: any) => {
      console.log(res);
      this.catalogdisplayService.catalogResultsInit = res;
      this.catalogdisplayService.catalogResults = res;
    })
  }

}
