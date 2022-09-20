package com.revature.Group4P2.beans.repositories;

import com.revature.Group4P2.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<Cart, Integer> {

    // NOTE: here make other needed queries
    // helpful site: https://www.tutorialspoint.com/spring_boot_jpa/spring_boot_jpa_native_queries.htm

    @Query("FROM cart WHERE user_user_id =  :userId ")
    public List<Cart> findAllCartByUsersId(@Param("userId") Integer userId);

    @Query("FROM cart WHERE user_user_id =  :userId and purchased_cart = false ")
    public Optional<Cart> findCartByUserIdPurchaseIsFalse(@Param("userId") Integer userId);

}
