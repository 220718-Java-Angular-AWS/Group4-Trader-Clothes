package com.revature.Group4P2.beans.controllers;

import com.revature.Group4P2.beans.services.UserService;
import com.revature.Group4P2.entities.Users;
import com.revature.Group4P2.exceptions.InvalidInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/shoppingusers")
public class UserController {

    private UserService service;

    @Autowired
    public UserController(UserService userService)
    {
//        System.out.println("MADE INTO USERS CONSTRUCTOR");
        this.service = userService;
//        System.out.println("MADE INTO USERS CONSTRUCTOR PAST SERVICE" );
    }


    //5 crud things:
    // GET - read by id- find,
    @RequestMapping(value = "/{userId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Users getUserById(@PathVariable Integer userId)
    {
        Optional<Users> optionalUser = service.getUserById(userId);
        return optionalUser.get();
    }

    // GET - read all - find all,
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody List<Users> getAllUsers()
    {
        return service.getAllUsers();
    }

    // POST - create - save,
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Users createUsers(@RequestBody Users user) throws InvalidInputException {
        System.out.println("MADE INTO POST");
        return service.createUsers(user); // changed by adding responsebody with users instead of void and said return
    }

    // PUT/PATCH - update - save,
    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateUser(@RequestBody Users user)
    {
        service.updateUser(user);
    }

    // DELETE - delete - delete
    @RequestMapping(value = "/{userId}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteUser(@PathVariable Integer userId)
    {
        service.deleteUserById(userId);
    }

}