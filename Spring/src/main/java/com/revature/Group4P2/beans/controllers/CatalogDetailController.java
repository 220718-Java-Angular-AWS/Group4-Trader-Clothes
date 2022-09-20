package com.revature.Group4P2.beans.controllers;

import com.revature.Group4P2.beans.services.CatalogDetailService;
import com.revature.Group4P2.beans.services.CatalogService;
import com.revature.Group4P2.entities.Cart;
import com.revature.Group4P2.entities.CatalogDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/catalogdetails")
public class CatalogDetailController {
    private CatalogDetailService service;

    @Autowired
    public CatalogDetailController(CatalogDetailService catalogDetailService)
    {
        this.service = catalogDetailService;
    }

    //5 crud things:
    // GET - read by id- find,
    @RequestMapping(value = "/{catdetId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody CatalogDetails getCatalogDetailsById(@PathVariable Integer catdetId)
    {
        Optional<CatalogDetails> optionalCatalogDetails = service.getCatalogDetailById(catdetId);
        return optionalCatalogDetails.get();
    }

    // GET - read all - find all,
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody List<CatalogDetails> getAllCatalogDetails()
    {
        return service.getAllCatalogDetail();
    }
    // POST - create - save,
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void createCatalogDetails(@RequestBody CatalogDetails catalogDetails)
    {
        service.createCatalogDetail(catalogDetails);
    }


    // PUT/PATCH - update - save,
    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateCatalogDetails(@RequestBody CatalogDetails catalogDetails)
    {
        service.updateCatalogDetail(catalogDetails);
    }
    // DELETE - delete - delete
    @RequestMapping(value = "/{catdetId}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteCatalogDetails(@PathVariable Integer catdetId)
    {
        service.deleteCatalogDetailById(catdetId);
    }

}
