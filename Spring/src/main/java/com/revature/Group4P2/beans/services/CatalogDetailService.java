package com.revature.Group4P2.beans.services;

import com.revature.Group4P2.beans.repositories.CatalogDetailsRepo;
import com.revature.Group4P2.entities.CatalogDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CatalogDetailService {
    CatalogDetailsRepo repo;

    @Autowired
    public CatalogDetailService(CatalogDetailsRepo catalogDetailsRepo)
    {
        this.repo = catalogDetailsRepo;
    }

    // crud repo

    // get by id
    public Optional<CatalogDetails> getCatalogDetailById(Integer id)
    {
        return repo.findById(id);
    }

    // get all
    public List<CatalogDetails> getAllCatalogDetail()
    {
        return repo.findAll();
    }

    // create
    public void createCatalogDetail(CatalogDetails catalogDetails)
    {
        repo.save(catalogDetails);
    }

    // update
    public void updateCatalogDetail(CatalogDetails catalogDetails)
    {
        repo.save(catalogDetails);
    }

    // delete
    public void deleteCatalogDetailById(Integer id)
    {
        repo.deleteById(id);
    }

}
