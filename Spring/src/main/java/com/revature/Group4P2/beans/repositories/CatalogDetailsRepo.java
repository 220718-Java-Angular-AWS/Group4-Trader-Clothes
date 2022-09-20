package com.revature.Group4P2.beans.repositories;

import com.revature.Group4P2.entities.CatalogDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogDetailsRepo extends JpaRepository<CatalogDetails, Integer> {
}
