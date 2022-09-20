package com.revature.Group4P2.beans.controllers;

import com.revature.Group4P2.beans.services.CatalogDetailService;
import com.revature.Group4P2.beans.services.CatalogService;
import com.revature.Group4P2.entities.Cart;
import com.revature.Group4P2.entities.Catalog;
import com.revature.Group4P2.entities.CatalogDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = "/catalog")
public class CatalogController {

    private CatalogService service;
    private CatalogDetailService catalogDetailService;

    @Autowired
    public CatalogController(CatalogService catalogService, CatalogDetailService catalogDetailService)
    {
        this.service = catalogService;
        this.catalogDetailService = catalogDetailService;

    }

    //5 crud things:
    // GET - read by id- find,
    @RequestMapping(value = "/{catId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Catalog getCatalogById(@PathVariable Integer catId)
    {
        Optional<Catalog> optionalCatalog = service.getCatalogById(catId);
        return optionalCatalog.get();
    }

    @RequestMapping(value = "itemName/{itemName}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody Catalog getCatalogByItemNameId(@PathVariable String itemName)
    {
        Optional<Catalog> optionalCatalog = service.findCatalogByItemName(itemName);
        optionalCatalog.get().setCatalogDetailId(optionalCatalog.get().getCatalogDetails().getCatalogDetailsId());
        return optionalCatalog.get();
    }

    @RequestMapping(value = "catalogDetails/{catId}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody List<Catalog> getCatalogByCatalogDetailsId(@PathVariable Integer catId)
    {
        List<Catalog> allCatalog = service.getAllCatalogByCatalogDetailsId(catId);
        for(Catalog catalog: allCatalog)
        {
            catalog.setCatalogDetailId(catalog.getCatalogDetails().getCatalogDetailsId());
        }
        return allCatalog;
    }



    // GET - read all - find all,
    @RequestMapping(method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public @ResponseBody List<Catalog> getAllCatalog()
    {
        List<Catalog> allCatalog = service.getAllCatalog();
        for(Catalog catalog: allCatalog)
        {
            catalog.setCatalogDetailId(catalog.getCatalogDetails().getCatalogDetailsId());
        }
        return allCatalog;
    }
    // POST - create - save,
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.OK)
    public void createCatalog(@RequestBody Catalog catalog)
    {
        //reaches out to the database and retrieves the object which corresponds to the row in the table that is denoted by ID: 1
        Optional<CatalogDetails> optional = catalogDetailService.getCatalogDetailById(catalog.getCatalogDetails().getCatalogDetailsId());
        if(optional.isPresent()) {
            catalog.setCatalogDetails(catalogDetailService.getCatalogDetailById(catalog.getCatalogDetails().getCatalogDetailsId()).get());
            catalog.setCatalogDetailId(catalog.getCatalogDetails().getCatalogDetailsId());
        }
        service.createCatalog(catalog);
    }


    // PUT/PATCH - update - save,
    @RequestMapping(method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void updateCatalog(@RequestBody Catalog catalog)
    {
        service.updateCatalog(catalog);
        System.out.println("UPDATING");
    }
    // DELETE - delete - delete
    @RequestMapping(value = "/{catId}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteCatalog(@PathVariable Integer catId)
    {
        // need to get the foreign key references and dereference them
        Optional<Catalog> optionalCatalog = service.getCatalogById(catId);
        if(optionalCatalog.isPresent())
        {
            Catalog catalog = optionalCatalog.get();
            // update the thing in the data base with null foreign keys
            catalog.setCatalogDetails(null);
            service.updateCatalog(catalog);
            service.deleteCatalogById(catId);
        }
        else {
            // throw exception
        }

    }
}