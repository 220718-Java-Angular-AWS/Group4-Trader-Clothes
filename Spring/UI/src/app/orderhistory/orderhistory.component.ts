import { Component, OnInit } from '@angular/core';
import { Users } from '../user';
import { UsersService } from '../users.service';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { CartItems } from '../cart-items';
import { CartItemService } from '../cart-item.service';
import { Catalog } from '../catalog';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
