package com.revature.Group4P2.beans.controllers;

import com.revature.Group4P2.beans.services.CartItemService;
import com.revature.Group4P2.beans.services.CartService;
import com.revature.Group4P2.beans.services.CatalogService;
import com.revature.Group4P2.entities.Cart;
import com.revature.Group4P2.entities.CartItems;
import com.revature.Group4P2.entities.Catalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;



@Controller
@RequestMapping(value = "/cartItem")
public class CartItemController {

    private CartItemService service;
    private CatalogService catalogService;
    private CartService cartService;

    @Autowired
    public CartItemController(CartItemService service ,CatalogService catalogService, CartService cartService )
    {
        this.service = service;
        this.cartService = cartService;
        this.catalogService = catalogService;
    }

    @RequestMapping(value = "/{cartItemId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody CartItems getCartItemsById(@PathVariable Integer cartItemId)
    {
        Optional<CartItems> optionalCartItem = service.getCartItemsById(cartItemId);
        optionalCartItem.get().setCatalogId(optionalCartItem.get().getCatalog().getItemId());
        return optionalCartItem.get();
    }

    @RequestMapping(value = "getCartItemsByCartId/{getCartItemsByCartId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody List<CartItems> getCartItemsByCartId(@PathVariable Integer getCartItemsByCartId)
    {
        List<CartItems> cartItems = service.getAllCartByCartId(getCartItemsByCartId);
        for(CartItems oneCartItem: cartItems)
        {
            // setting variable
            oneCartItem.setCatalogId(oneCartItem.getCatalog().getItemId());
            oneCartItem.getCart().setCartUserId(oneCartItem.getCart().getUser().getUserId());
        }
        return cartItems;
    }

    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody List<CartItems> getAllCartItems()
    {
        List<CartItems> cartItems = service.getAllCartItems();

        for(CartItems oneCartItem: cartItems)
        {
            // setting variable
            oneCartItem.setCatalogId(oneCartItem.getCatalog().getItemId());
        }
        return cartItems;
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void createCartItem(@RequestBody CartItems cartItem)
    {
        Optional<Catalog> optionalCatalog = catalogService.getCatalogById(cartItem.getCatalog().getItemId());
        Optional<Cart> optionalCart = cartService.getCartById(cartItem.getCart().getCartId());
        if(optionalCatalog.isPresent() && optionalCart.isPresent()) {
            cartItem.setCatalog(catalogService.getCatalogById(cartItem.getCatalog().getItemId()).get());
            cartItem.setCart(cartService.getCartById(cartItem.getCart().getCartId()).get());
            service.createCartItem(cartItem);
        }
        else
        {
            // throw exception later on
            System.out.println("CART ITEM NOT CREATED");
        }
    }

    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateCartItem(@RequestBody CartItems cartItems)
    {
        service.updateCartItem(cartItems);
    }
    // DELETE - delete - delete
    @RequestMapping(value = "/{cartItemId}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteCartItem(@PathVariable Integer cartItemId)
    {
        System.out.println("CART ITEM DELETE ");
        Optional<CartItems> optionalCartItem = service.getCartItemsById(cartItemId);
        if(optionalCartItem.isPresent())
        {
            CartItems cartItems = optionalCartItem.get();

            List<CartItems> listOfCartItems = cartItems.getCart().getCartItems();

            listOfCartItems.remove(cartItems);

            cartItems.setCatalog(null);
            cartItems.setCart(null);
            service.updateCartItem(cartItems);
            service.deleteCartItemById(cartItemId);
        }

    }



}



//@Controller
//@RequestMapping(value = "/cartItem")
//public class CartItemController {
//
//    private CartItemService service;
//    private CatalogService catalogService;
//    private CartService cartService;
//
//    @Autowired
//    public CartItemController(CartItemService service ,CatalogService catalogService, CartService cartService )
//    {
//        this.service = service;
//        this.cartService = cartService;
//        this.catalogService = catalogService;
//    }
//
//    @RequestMapping(value = "/{cartItemId}", method = RequestMethod.GET)
//    @ResponseStatus(value = HttpStatus.OK)
//    public @ResponseBody CartItems getCartItemsById(@PathVariable Integer cartItemId)
//    {
//        Optional<CartItems> optionalCartItem = service.getCartItemsById(cartItemId);
//
//        Optional<Catalog> catalog = catalogService.getCatalogById(optionalCartItem.get().getCatalogId());
//        optionalCartItem.get().setCatalog(catalog.get());
//        optionalCartItem.get().setCatalogId(catalog.get().getItemId());
//        return optionalCartItem.get();
//    }
//
//    @RequestMapping(value = "getCartItemsByCartId/{getCartItemsByCartId}", method = RequestMethod.GET)
//    @ResponseStatus(value = HttpStatus.OK)
//    public @ResponseBody List<CartItems> getCartItemsByCartId(@PathVariable Integer getCartItemsByCartId)
//    {
//        System.out.println("getCartItemsByCartId ....");
//        List<CartItems> cartItems = service.getAllCartByCartId(getCartItemsByCartId);
//        for(CartItems oneCartItem: cartItems)
//        {
////            Optional<Catalog> catalog = catalogService.getCatalogById(oneCartItem.getCatalogId());
////            oneCartItem.setCatalog(catalog.get());
//            oneCartItem.setCatalogId(catalogService.getCatalogById().get().getItemId());
//            // setting variable
//        }
//        return cartItems;
//    }
//
//    @RequestMapping(method = RequestMethod.GET)
//    @ResponseStatus(value = HttpStatus.OK)
//    public @ResponseBody List<CartItems> getAllCartItems()
//    {
//        List<CartItems> cartItems = service.getAllCartItems();
//
//        for(CartItems oneCartItem: cartItems)
//        {
//            // setting variable
//            oneCartItem.setCatalogId(oneCartItem.getCatalog().getItemId());
//        }
//        return cartItems;
//    }
//
//    @RequestMapping(method = RequestMethod.POST)
//    @ResponseStatus(value = HttpStatus.OK)
//    public void createCartItem(@RequestBody CartItems cartItem)
//    {
//        Optional<Catalog> optionalCatalog = catalogService.getCatalogById(cartItem.getCatalog().getItemId());
//        Optional<Cart> optionalCart = cartService.getCartById(cartItem.getCart().getCartId());
//        if(optionalCatalog.isPresent() && optionalCart.isPresent()) {
//            cartItem.setCatalog(catalogService.getCatalogById(cartItem.getCatalog().getItemId()).get());
//            cartItem.setCart(cartService.getCartById(cartItem.getCart().getCartId()).get());
//            service.createCartItem(cartItem);
//        }
//        else
//        {
//            // throw exception later on
//            System.out.println("CART ITEM NOT CREATED");
//        }
//    }
//
//    @RequestMapping(method = RequestMethod.PUT)
//    @ResponseStatus(value = HttpStatus.ACCEPTED)
//    public void updateCartItem(@RequestBody CartItems cartItems)
//    {
//        service.updateCartItem(cartItems);
//    }
//    // DELETE - delete - delete
//    @RequestMapping(value = "/{cartItemId}", method = RequestMethod.DELETE)
//    @ResponseStatus(value = HttpStatus.ACCEPTED)
//    public void deleteCartItem(@PathVariable Integer cartItemId)
//    {
//        System.out.println("CART ITEM DELETE ");
//        Optional<CartItems> optionalCartItem = service.getCartItemsById(cartItemId);
//        if(optionalCartItem.isPresent())
//        {
//            CartItems cartItems = optionalCartItem.get();
//
//            List<CartItems> listOfCartItems = cartItems.getCart().getCartItems();
//
//            listOfCartItems.remove(cartItems);
//
//            cartItems.setCatalog(null);
//            cartItems.setCart(null);
//            service.updateCartItem(cartItems);
//            service.deleteCartItemById(cartItemId);
//        }
//
//    }
//
//
//
//}