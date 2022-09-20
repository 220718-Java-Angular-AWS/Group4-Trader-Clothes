import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { CartItems } from '../cart-items';
import { CartItemService } from '../cart-item.service';
import { Users } from '../user';
import { UsersService } from '../users.service';
import { CatalogService } from '../catalog.service';
import { Catalog } from '../catalog';
import { Router } from '@angular/router';
import { CreateCart } from '../createCart';

@Component({
  selector: 'app-checkoutcart',
  templateUrl: './checkoutcart.component.html',
  styleUrls: ['./checkoutcart.component.css']
})
export class CheckoutcartComponent implements OnInit {
  _cartService: any;
  //how do i grab the current instance of userId + what cart is false? 
  _cartItemsService: CartItemService;
  _catalogService: CatalogService;
  currentUserId: number = 0;
  cartCatalogItems: [Catalog, number][] = [];
  totalCost: number = 0;
  confirmationCheckout: string = "";
  userCart: Cart =
    {
      cartId: 0,
      date: "",
      purchasedCart: false,
      cartUserId: 0

    }

  userCartItems: CartItems[] = [];
  now = new Date();
  formalDate = this.now.getMonth() + "/" + this.now.getDate() + "/" + this.now.getFullYear()
  _userService: UsersService;

  router: Router;




  constructor(cartService: CartService, cartItemService: CartItemService, catalogService: CatalogService, router: Router, userService: UsersService) {
    this._cartService = cartService;
    this._cartItemsService = cartItemService;
    this._catalogService = catalogService;
    this.router = router;
    this._userService = userService;
  }

  ngOnInit(): void {
    this.currentUserId = Number(localStorage.getItem("currentUserId"));
    this.viewCartItems();

  }

  
  

  viewCartItems() { //should somehow detect userId and load upon routing here?
    this._cartService.GetCartByIdFalseCart(this.currentUserId)
      .subscribe((cart: Cart) => {
        console.log("CHECKOUT VIEW CART : ", cart);
        this.userCart = cart;
        console.log("cart Cart ID:", cart.cartId)
        // need to get all the cart items associated with this cart 
        this._cartItemsService.GetAllCartItemsByCartId(cart.cartId)
          .subscribe((cartItems: CartItems[]) => {
            this.userCartItems = cartItems;
            // need to get all the items from catalog to display 
            for (var item of cartItems) {

              //cartCatalogItems
              this._catalogService.GetcatalogbyId(item.catalogId)
                .subscribe((catItem: Catalog) => {
                  this.totalCost += item.totalCost;
                  this.cartCatalogItems.push([catItem, item.totalCost])
                })
            }
          })

      });
  }

  buyCart() {

    console.log("MADE INTO BUY CART")

    // need to set the cart to true 

    // find a way to fake charge card maybe ??

    this.confirmationCheckout = "Thank you for making a purchase";
    //need to set the cart to true 
    this.userCart.purchasedCart = true;

    console.log("USER CART: ", this.userCart)
    this._cartService.Updatecart(this.userCart)
      .subscribe(
        () => {
          console.log("UPDATED CART SHOULD NOW BE TRUE FOR " + this.userCart.cartId);

          this._userService.GetUserbyId()
          .subscribe(
            (currentUser: Users)=>
            {
              // create them a new cart 
              let newCart: CreateCart = 
              {
                date: this.formalDate,
                purchasedCart: false,
                user: currentUser
              }
  
            console.log("new cart: ", newCart);
            this._cartService.Createcart(newCart)
            .subscribe(
              () => 
              {
                console.log("post request sent CREATE USER A NEW CART...")
              });
  
            }

          )
          
        }
      )


  }



  cartId(cartId: any) {
    throw new Error('Method not implemented.');
  }

  deleteItem(id: number): void {
    console.log('cartItemId DELETE CATALOG: ', id)

    for (var cartItem of this.userCartItems) {

      if (cartItem.catalogId === id) {
        console.log("MADE INTO IF STATEMENT DELETE ")
        console.log("CART ITEM CATALOG ID :  ", cartItem.catalogId);
        console.log("CART ITEM ID: ", cartItem.cartItemId);

        this._cartItemsService.DeleteCartItems(cartItem.cartItemId)
          .subscribe(() => {
            console.log("Deleted Cart Item Id: " + cartItem.cartItemId)
            // this.router.navigate(['/checkoutcart'], { replaceUrl: true })
            // clear screen 
            const currentUrl = this.router.url;
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
            });

          })

        // this.router.navigate(['/checkoutcart'], { replaceUrl: true })
      }
    }



  }

}