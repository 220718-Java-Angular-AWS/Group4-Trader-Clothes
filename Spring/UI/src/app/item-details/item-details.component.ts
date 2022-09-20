import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../cart';
import { CartItemService } from '../cart-item.service';
import { CartService } from '../cart.service';
import { Catalog } from '../catalog';
import { CatalogService } from '../catalog.service';
import { CreateCartItems } from '../create-cart-item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {

  currentUserId : number = Number(localStorage.getItem("currentUserId"));

  

  _catalogService : CatalogService ;
  router: ActivatedRoute;
  _cartService: CartService;
  _cartItemService: CartItemService;

  srcImage : string = "";
  quantity: number = 0;
  purchaseAmount: number = 0;
  itemAddedToCart:string = "";

  catalogItem: Catalog = {
    itemId: 0,
    itemName: "",
    itemPrice: 0,
    catalogDetailsId: 0,
    imageURL:""
  };

  cart : Cart= {
    cartId: 0,
    date: '',
    purchasedCart: false,
    cartUserId: 0
  }

  constructor(catalogService : CatalogService, router: ActivatedRoute, cartService: CartService, cartitemservice: CartItemService) {
    this._catalogService = catalogService;
    this.router = router;
    this._cartService = cartService;
    this._cartItemService = cartitemservice;
   }

  ngOnInit(): void {
    this.getItem();

  }

  getItem(): void 
  {
    // get the id passed from the router 
    let id = parseInt(this.router.snapshot.paramMap.get('id')!, 10); 
    console.log("Catalog Id:",id)
    // find the item through catalogservice 
    this._catalogService.GetcatalogbyId(id)
    .subscribe((item: Catalog)=> {this.catalogItem = item;
      console.log("CatalogItem: ", this.catalogItem)
    this.srcImage = this.catalogItem.imageURL});


    this._cartService.GetCartByIdFalseCart(this.currentUserId)
    .subscribe((data: Cart) => {this.cart = data
    console.log("Cart: ", this.cart)
    })

    


  }


  changeQuantity(): void {
    if(this.catalogItem !== undefined)
    {
      this.purchaseAmount = this.quantity * this.catalogItem.itemPrice;
    }
  }

  addItemToCart(): void
  {
    if(this.quantity !=0)
    {
      // need to add the item to the cart
    console.log("MADE INTO ADD CART ITEM") 
    let createItem : CreateCartItems ;
    

    // createCart
    createItem = {
      quantity: this.quantity,
      totalCost: this.purchaseAmount,
      catalog: this.catalogItem,
      cart: this.cart 
    } 

    console.log("create Item: ", createItem)

    

    this._cartItemService.createCartItem(createItem)
    .subscribe(()=> {console.log("CREATED CART ")})

    // add item to screen 
    this.itemAddedToCart = "Amount of $"+ this.purchaseAmount + " was added to your cart";
    }

    else
    {
      alert("Choose A quantity");
    }

  }


}
