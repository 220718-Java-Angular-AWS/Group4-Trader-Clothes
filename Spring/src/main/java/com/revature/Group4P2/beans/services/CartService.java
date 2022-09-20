package com.revature.Group4P2.beans.services;

import com.revature.Group4P2.beans.repositories.CartRepo;
import com.revature.Group4P2.entities.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    CartRepo repo;

    @Autowired
    public CartService(CartRepo cartRepo)
    {
        this.repo = cartRepo;
    }

    // crud repo

    // get by id
    public Optional<Cart> getCartById(Integer id)
    {
        return repo.findById(id);
    }

    public List<Cart> getAllCartById(Integer id)
    {
        return repo.findAllCartByUsersId(id);
    }

    public Optional<Cart>  getCartByUserIdPurchaseIsFalse(Integer id )
    {
        return repo.findCartByUserIdPurchaseIsFalse(id);
    }

    // get all
    public List<Cart> getAllCart()
    {
        return repo.findAll();
    }

    // create
    public void createCart(Cart cart)
    {
        repo.save(cart);
    }

    // update
    public void updateCart(Cart cart)
    {
        repo.save(cart);
    }

    // delete
    public void deleteCartById(Integer id)
    {
        repo.deleteById(id);
    }



}
