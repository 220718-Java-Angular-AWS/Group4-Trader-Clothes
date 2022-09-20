package com.revature.Group4P2;

import com.revature.Group4P2.beans.repositories.CartRepo;
import com.revature.Group4P2.beans.services.CartService;

import com.revature.Group4P2.entities.Cart;
import com.revature.Group4P2.entities.Catalog;
import com.revature.Group4P2.entities.CatalogDetails;
import com.revature.Group4P2.entities.Users;
import org.junit.jupiter.api.Test;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CartTest {

	@Autowired
	private CartService service;
	@MockBean
	private CartRepo repo;

	@Test
	void contextLoads() {
	}

	//testing cart getCartById() method
	@Test
	public void getCartByIdTest() {
		Integer itemId = 1;

		//need to refactor catalogItem
		CatalogDetails catalogDetailsItem = new CatalogDetails(1, "shorts");
		Catalog catalogItem = new Catalog("fortnite shirt", 100.01, "www.awesome.com", catalogDetailsItem);
		Users userItem = new Users(1, "John", "Smith", "JSmith@email.com", "helloworld", "jsmith", "12100 w night lane", "1234456778911234");
		Cart cart = new Cart(1, "2/15/2022", false, userItem);

		//creating 2 cart objects to see if the CartService will return 1 object
		when(repo.findById(itemId)).thenReturn(Optional.of(cart));
		assertEquals(Optional.of(cart), service.getCartById(itemId));
	}

	//testing getAllCartById() method
	@Test
	public void getAllCartByIdTest() {
		CatalogDetails catalogDetailsItem = new CatalogDetails(1, "shorts");
		Catalog catalogItem = new Catalog("hello", 25.50, "World", catalogDetailsItem);
		Users userItem1 = new Users(1, "John", "Smith", "JSmith@email.com", "helloworld", "jsmith", "12100 w night lane", "1234456778911234");
		Users userItem2 = new Users(1, "pam", "west", "pwest@email.com", "helloworld", "pwest", "45400 e day drive", "1234456778911234");
		Users userItem3 = new Users(2, "sam", "brown", "sbrown@email.com", "helloworld", "sbrown", "78700 s test ave", "1234456778911234");

		//create three carts and find two by user ID
		Cart cart1 = new Cart(1, "3/15/2022", false, userItem1);
		Cart cart2 = new Cart(2, "3/16/2022", false, userItem2);
		Cart cart3 = new Cart(3, "3/17/20022", false, userItem3);

		when(repo.findAllCartByUsersId(1)).thenReturn((List<Cart>) Stream
				.of(new Cart(1, "3/15/2022", false, userItem1), new Cart(2, "3/16/2022", false, userItem2)));
		assertEquals(2, service.getAllCartById(1).size());

	}
	//testing getCartByUserIdPurchaseIsFalse() method
//	@Test
//	public void getCartByUserIdPurchaseIsFalseTest() {
//		Users userItem1 = new Users(1, "John", "Smith", "JSmith@email.com", "helloworld", "jsmith", "12100 w night lane", "1234456778911234");
//		Users userItem2 = new Users(1, "pam", "west", "pwest@email.com", "helloworld", "pwest", "45400 e day drive", "1234456778911234");
//		Users userItem3 = new Users(2, "sam", "brown", "sbrown@email.com", "helloworld", "sbrown", "78700 s test ave", "1234456778911234");
//
//		//create carts with different purchasedCart values
//		Cart cart1 = new Cart(1, "4/5/2022", true, userItem1);
//		Cart cart2 = new Cart(2, "5/16/2022", false, userItem2);
//		Cart cart3 = new Cart(3, "7/12/2022", true, userItem3);
//
//		when(repo.findCartByUserIdPurchaseIsFalse(1)).thenReturn(Stream
//				.of(new Cart(1, "4/5/2022", true, userItem1), new Cart(2, "5/16/2022", false, userItem2)));
//
//	}





	//testing cart getAllCart() method
	@Test
	public void getAllCartTest() {
		CatalogDetails catalogDetailsItem = new CatalogDetails(1, "shorts");
		Catalog catalogItem = new Catalog("hello", 25.50, "World", catalogDetailsItem);
		Users userItem = new Users(1, "John", "Smith", "JSmith@email.com", "helloworld", "jsmith", "12100 w night lane", "1234456778911234");

		// creating 2 cart objects and seeing if the CartService will find 2 cart objects
		when(repo.findAll()).thenReturn(Stream
				.of(new Cart(1, "3/15/2022", false, userItem	), new Cart(2, "3/16/2022", false, userItem)).collect(Collectors.toList()));
		assertEquals(2, service.getAllCart().size());
	}

	//testing createCart() method
	@Test
	public void createCartTest() {
		CatalogDetails catalogDetailsItem = new CatalogDetails(1, "shorts");
		Catalog catalogItem = new Catalog("dodogamon", 34.99, "www.coolio.web", catalogDetailsItem);
		Users userItem = new Users(1, "John", "Smith", "JSmith@email.com", "helloworld", "jsmith", "12100 w night lane", "1234456778911234");
		Cart cart = new Cart(1,  "1/1/2022", false, userItem);


		//creating a cart object and seeing if that cart object is created
		repo.save(cart);
		assertNotNull(repo.findById(1).get());

	}

	//testing updateCart() method
	@Test
	public void updateCartTest() {
		CatalogDetails catalogDetailsItem = new CatalogDetails(1, "shorts");
		Catalog catalogItem = new Catalog("battle pass", 10.99, "www.epicgames.com", catalogDetailsItem);
		Users userItem = new Users(1, "John", "Smith", "JSmith@email.com", "helloworld", "jsmith", "12100 w night lane", "1234456778911234");
		Cart cart = new Cart(1,  "5/17/2022", false, userItem);

		//create second cart to be updated
		Cart updatedCart = cart;
		updatedCart.setDate("8/15/2022");
		repo.save(updatedCart);

		//testing if the updated cart was saved
		assertNotEquals(cart, updatedCart);
	}

	//testing deleteCartById() method
	@Test
	public void deleteCartByIdTest() {
		CatalogDetails catalogDetailsItem = new CatalogDetails(1, "shorts");
		Catalog catalogItem = new Catalog("cowboy hat", 1.11, "www.amazon.com", catalogDetailsItem);
		Users userItem = new Users(1, "John", "Smith", "JSmith@email.com", "helloworld", "jsmith", "12100 w night lane", "1234456778911234");
		Cart cart = new Cart(1, "7/15/2022", false, userItem);

		service.deleteCartById(1);

		Cart cart1 = null;

		Optional<Cart> optionalCart = service.getCartById(1);

		if(optionalCart.isPresent()) {
			cart1 = optionalCart.get();
		}

		assertThat(cart1).isNull();
	}


}
