package com.revature.Group4P2.beans.repositories;

import com.revature.Group4P2.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepo extends JpaRepository<Users, Integer> {

    Optional<Users> findByUsername(String username);
}