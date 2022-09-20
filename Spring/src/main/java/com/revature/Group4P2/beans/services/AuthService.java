package com.revature.Group4P2.beans.services;

import com.revature.Group4P2.beans.repositories.UsersRepo;
import com.revature.Group4P2.entities.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.revature.Group4P2.exceptions.AccessDeniedException;
import java.util.Optional;

@Service
public class AuthService {
    private UsersRepo repo;

    @Autowired
    public AuthService(UsersRepo userRepo) {
        this.repo = userRepo;
    }

    public Users authenticate(String username, String password) throws AccessDeniedException {
        System.out.println("MADE INTO LOGIN SERVICE METHOD");
        Optional<Users> result = repo.findByUsername(username);
        if(result.isPresent() && result.get().getPassword().equals(password)) {
            System.out.println("username/password match");
            return result.get();
        } else {
            System.out.println("username/password DID NOT match");
            throw new AccessDeniedException("Login failed - Check Credentials!");
//            Users user = null;
//            return user;
        }

    }
}