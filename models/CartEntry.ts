import { ProductVariance } from "./ProductVariance";

export interface CartEntry {
    id: number,
    productVariance: ProductVariance,
    quantity: number,
    pricePerPiece: number,
    totalPrice: number
}
