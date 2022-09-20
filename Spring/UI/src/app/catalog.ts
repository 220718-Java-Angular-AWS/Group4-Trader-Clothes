import { CatalogDetails } from "./catalogDetails";

export interface Catalog {
    itemId: number;
    itemName: String;
    itemPrice: number;
    catalogDetailsId: number;
    imageURL:string;
}