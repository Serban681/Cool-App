import { Address } from "./Address";
import { Cart } from "./Cart";

export interface OrderRequest {
    userId: number,
    cart: Cart,
    paymentType: string,
    deliveryAddress: Address,
    billingAddress: Address
}
