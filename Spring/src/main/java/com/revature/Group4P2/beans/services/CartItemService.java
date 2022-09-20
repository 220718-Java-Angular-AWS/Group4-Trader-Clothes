package com.revature.Group4P2.beans.services;

import com.revature.Group4P2.beans.repositories.CartItemsRepo;
import com.revature.Group4P2.entities.Cart;
import com.revature.Group4P2.entities.CartItems;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    private CartItemsRepo repo;

    @Autowired
    public CartItemService(CartItemsRepo repo)
    {
        this.repo = repo;
    }

    public Optional<CartItems> getCartItemsById(Integer id)
    {
        return repo.findById(id);
    }

    public List<CartItems> getAllCartByCartId(Integer id)
    {
        List<CartItems> cartItems = repo.findAllCartItemsByCartId(id);
        return repo.findAllCartItemsByCartId(id);
    }

    public List<CartItems> getAllCartItems()
    {
        return repo.findAll();
    }

    // create
    public void createCartItem(CartItems cartItems)
    {
        repo.save(cartItems);
    }

    // update
    public void updateCartItem(CartItems cartItems)
    {
        repo.save(cartItems);
    }

    // delete
    public void deleteCartItemById(Integer id)
    {
        repo.deleteById(id);
    }


}

