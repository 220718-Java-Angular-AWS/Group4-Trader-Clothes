package com.revature.Group4P2.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity(name = "catalog")
public class Catalog {
    // columns and variables
    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_price")
    private Double itemPrice;

    @Column(name="image")
    private String imageURL;
    
    @Transient
    private Integer catalogDetailId;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JsonBackReference(value = "catalogDetails - catalog")
    private CatalogDetails catalogDetails;


    @OneToMany(mappedBy = "catalog", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "catalog-cartitem")
    private List<CartItems> cartItems;


    public Catalog() {
    }

    public Catalog(Integer itemId, String itemName, Double itemPrice, String imageURL, CatalogDetails catalogDetails) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.imageURL = imageURL;
        this.catalogDetails = catalogDetails;
    }

    public Catalog(String itemName, Double itemPrice, String imageURL, CatalogDetails catalogDetails) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.imageURL= imageURL;
        this.catalogDetails = catalogDetails;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Double getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public CatalogDetails getCatalogDetails() {
        return catalogDetails;
    }

    public void setCatalogDetails(CatalogDetails catalogDetails) {
        this.catalogDetails = catalogDetails;
    }

    public List<CartItems> getCartItems() {
        return cartItems;
    }

    public Integer getCatalogDetailId() {
        return catalogDetailId;
    }

    public void setCatalogDetailId(Integer catalogDetailId) {
        this.catalogDetailId = catalogDetailId;
    }

    public void setCartItems(List<CartItems> cartItems) {
        this.cartItems = cartItems;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    @Override
    public String toString() {
        return "Catalog{" +
                "itemId=" + itemId +
                ", itemName='" + itemName + '\'' +
                ", itemPrice=" + itemPrice +
                ", catalogDetails=" + catalogDetails +
                '}';
    }
}


