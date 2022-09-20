package com.revature.Group4P2.beans.repositories;


import com.revature.Group4P2.entities.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemsRepo extends JpaRepository<CartItems, Integer> {

    @Query("FROM cart_items WHERE cart_cart_id = :cartId")
    public List<CartItems> findAllCartItemsByCartId(@Param("cartId") Integer userId);

}
