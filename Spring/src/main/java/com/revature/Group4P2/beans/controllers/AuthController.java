package com.revature.Group4P2.beans.controllers;
import com.revature.Group4P2.beans.services.UserService;
import com.revature.Group4P2.dto.Login;
import com.revature.Group4P2.beans.services.AuthService;
import com.revature.Group4P2.entities.Users;
import com.revature.Group4P2.exceptions.AccessDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/login")
public class AuthController {
    private AuthService service;
    private UserService userService;

    @Autowired
    public AuthController(AuthService authService, UserService userService) {
        this.service = authService;
        this.userService = userService;
    }


    @RequestMapping(value = "/auth", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Users authenticate(@RequestBody Login login) throws AccessDeniedException {
        System.out.println("Made into athenticate");
        Users user = service.authenticate(login.getUsername(), login.getPassword());
        return user;
    }

    //Need a custom exception, and annotate that exception class with @ResponseStatus use the code that would indicate an unsuccessful attempt
    //in the controller we need to verify if auth is good or bad, and if it's bad throw the custom exception
    //lastly, we need an error handler to handle the thrown exception



}