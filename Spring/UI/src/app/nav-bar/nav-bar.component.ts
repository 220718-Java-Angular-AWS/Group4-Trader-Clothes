import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayProfile(): void
  {

  }

  displayShoppingCart(): void
  {

  }
  searchBar(){
    //needs to somehow lead to search result view upon clicking "search" button (from nested search bar view, visible in nav-bar view)
      }
}
