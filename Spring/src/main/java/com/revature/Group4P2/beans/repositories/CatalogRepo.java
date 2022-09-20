package com.revature.Group4P2.beans.repositories;

import com.revature.Group4P2.entities.Catalog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CatalogRepo extends JpaRepository<Catalog, Integer> {

    @Query("FROM catalog WHERE catalog_details_catalog_details_id =  :catalogId")
    public List<Catalog> findAllCatalogByCatalogDetailsId(@Param("catalogId") Integer catalogId);

    @Query("FROM catalog WHERE item_name = :itemName")
    public Optional<Catalog> findByCatalogName(@Param("itemName") String itemName);

}