import { Cart } from "./cart";
import { Catalog } from "./catalog";

export interface CreateCartItems {
    quantity: number;
    totalCost: number;
    catalog: Catalog;
    cart: Cart;
}