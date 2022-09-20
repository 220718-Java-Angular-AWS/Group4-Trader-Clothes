package com.revature.Group4P2.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.sun.org.apache.xpath.internal.operations.Bool;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity(name = "cart")
public class Cart {
    // columns and attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    private Integer cartId;

    @Column
    private String date;

    @Transient
    private Integer cartUserId;

    @Column
    private Boolean purchasedCart = false;
//    @Column
//    private Integer quantity;




    // foreign key userID which is from ShoppingUser
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference(value = "user-cart")
    private Users user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "cart-cartitem")
    private List<CartItems> cartItems;

    public Cart() {
    }

    public Cart(Integer cartId, String date, Boolean purchasedCart, Users user) {
        this.cartId = cartId;
        this.date = date;
        this.purchasedCart = purchasedCart;
        this.user = user;
    }

    public Cart(String date, Boolean purchasedCart, Users user) {
        this.date = date;
        this.purchasedCart = purchasedCart;
        this.user = user;
    }

    public Cart(String date, Users user) {
        this.date = date;
        this.purchasedCart = false;
        this.user = user;
    }


    public Integer getCartId() {
        return cartId;
    }

    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getPurchasedCart() {
        return purchasedCart;
    }

    public void setPurchasedCart(Boolean purchasedCart) {
        this.purchasedCart = purchasedCart;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public List<CartItems> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<CartItems> cartItems) {
        this.cartItems = cartItems;
    }

    public Integer getCartUserId() {
        return cartUserId;
    }

    public void setCartUserId(Integer cartUserId) {
        this.cartUserId = cartUserId;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "cartId=" + cartId +
                ", date='" + date + '\'' +
                ", purchasedCart=" + purchasedCart +
                ", user=" + user +
                ", cartItems=" + cartItems +
                '}';
    }
}
