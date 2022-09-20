import { Users } from "./user";
export interface Cart {
    cartId: number;
    date: string;
    purchasedCart: boolean;
    cartUserId: number;
}