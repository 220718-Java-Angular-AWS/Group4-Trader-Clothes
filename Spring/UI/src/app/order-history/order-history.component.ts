import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../cart-item.service';
import { CartItems } from '../cart-items';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { Catalog } from '../catalog';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  _cartService: CartService;
  _cartItemService: CartItemService;
  currentUserId: number = 0;
  _catalogService: CatalogService;


  allUserCart: [number, string][] = [];
  allUserCartItems: [[Catalog, CartItems][]][] = [];
  dates: string[] = [];


  constructor(cartService: CartService, cartitemService: CartItemService, catalogService: CatalogService) {
    this._cartItemService = cartitemService;
    this._cartService = cartService;
    this._catalogService = catalogService;


  }

  ngOnInit(): void {
    // get the currentUser
    let currentUserId: number = Number(localStorage.getItem("currentUserId"));
    let listCatalog: Catalog[] = []
    // need to get the carts associated with the user;
    this._cartService.Getcart()
      .subscribe(
        (data: Cart[]) => {
          for (var cart of data) {
            if (cart.cartUserId === currentUserId) {
              this.allUserCart.push([cart.cartId, cart.date])

            }
          }

          // // i want to get all the carts items associated with the carts 
          // this.getCartItems(this.allUserCart)

        }
      )


  }



  // // getCartItems(allUserCart: [number, string][]): void {

  // //   //allUserCartItems: [string, CartItems[]][] = [];

  // //   for(var cart of allUserCart)
  // //   {
  // //     let catalogList: [Catalog,CartItems] = []
  // //     // need to get all the items for each cart
  // //     this._cartItemService.GetAllCartItemsByCartId(cart[0])
  // //     .subscribe((items: CartItems[]) => {
  // //       // this gets all the 
  // //       for(var item of items)
  // //       {
  // //         this._catalogService.GetcatalogbyId(item.catalogId)
  // //         .subscribe(
  // //           (itemCat:Catalog)=>
  // //           {
  // //             catalogList.push([itemCat,item] );
  // //           }
  // //         )
  // //       }
  // //       this.dates.push(cart[1])
  // //       this.allUserCartItems.push(catalogList);


  // //     })

  // //   }

  // // }



}
