import { Cart } from "./cart";
import { Catalog } from "./catalog";

export interface CartItems {
    cartItemId: number;
    quantity: number;
    totalCost: number;
    catalogId: number;
}